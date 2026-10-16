import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 3000
const INTERVAL_MS = 20_000

const DEFAULTS = {
  baseline: 35000,
  multiplier: 2,
  festivalStart: 5,
  duration: 21,
  horizon: 40,
  labs: 20,
  shifts: 2,
  techsPerShiftPerLab: 25,
  lensesPerTechPerHour: 6,
  shiftHours: 8,
  efficiency: 85,
  startingBacklog: 0,
  slaDays: 3,
}

const FIELDS = Object.keys(DEFAULTS)

function httpError(status, message) {
  const err = new Error(message)
  err.status = status
  return err
}

function snap(n) {
  if (!Number.isFinite(n) || Math.abs(n) < 1e-6) return 0
  return n
}

function parseInputs(body) {
  const src = { ...DEFAULTS, ...(body || {}) }
  const inputs = {}
  for (const key of FIELDS) {
    const n = Number(src[key])
    if (!Number.isFinite(n)) throw httpError(400, `${key} must be a number`)
    inputs[key] = n
  }
  if (inputs.horizon < 1 || inputs.horizon > 366) throw httpError(400, 'Horizon must be between 1 and 366 days')
  if (inputs.festivalStart < 1) throw httpError(400, 'Festival start day must be at least 1')
  if (inputs.duration < 0) throw httpError(400, 'Festival duration cannot be negative')
  if (inputs.baseline < 0 || inputs.startingBacklog < 0) throw httpError(400, 'Order counts cannot be negative')
  if (inputs.multiplier < 0) throw httpError(400, 'Multiplier cannot be negative')
  if (inputs.labs < 0 || inputs.shifts < 0 || inputs.techsPerShiftPerLab < 0) {
    throw httpError(400, 'Lab and staffing counts cannot be negative')
  }
  if (inputs.lensesPerTechPerHour < 0 || inputs.shiftHours < 0) throw httpError(400, 'Throughput values cannot be negative')
  if (inputs.efficiency < 0 || inputs.efficiency > 100) throw httpError(400, 'Efficiency must be between 0 and 100')
  if (inputs.slaDays <= 0) throw httpError(400, 'SLA days must be greater than 0')
  return inputs
}

function computeSurge(inputs) {
  const {
    baseline,
    multiplier,
    festivalStart,
    duration,
    horizon,
    labs,
    shifts,
    techsPerShiftPerLab,
    lensesPerTechPerHour,
    shiftHours,
    efficiency,
    startingBacklog,
    slaDays,
  } = inputs

  const eff = efficiency / 100
  const dailyCapacity = labs * shifts * techsPerShiftPerLab * lensesPerTechPerHour * shiftHours * eff
  const capacityPerTech = lensesPerTechPerHour * shiftHours * eff
  const slotsPerTech = labs * shifts * capacityPerTech
  const festivalLastDay = festivalStart + duration - 1

  const days = []
  let backlog = startingBacklog
  let peakBacklog = -1
  let peakBacklogDay = 1

  for (let day = 1; day <= horizon; day += 1) {
    const inFestival = day >= festivalStart && day < festivalStart + duration
    const demand = baseline * (inFestival ? multiplier : 1)
    const incoming = backlog + demand
    const processed = Math.min(dailyCapacity, incoming)
    const nextBacklog = snap(incoming - processed)
    const requiredCapacity = demand + backlog / slaDays
    const requiredTechs = slotsPerTech > 0 ? Math.ceil(requiredCapacity / slotsPerTech - 1e-9) : 0

    if (nextBacklog > peakBacklog) {
      peakBacklog = nextBacklog
      peakBacklogDay = day
    }

    days.push({
      day,
      demand,
      capacity: dailyCapacity,
      processed: snap(processed),
      backlog: nextBacklog,
      requiredTechs,
      inFestival,
    })
    backlog = nextBacklog
  }

  if (peakBacklog < 0) {
    peakBacklog = 0
    peakBacklogDay = 1
  }

  const festivalDays = days.filter((d) => d.inFestival)
  const peakRequiredTechs = festivalDays.length
    ? Math.max(...festivalDays.map((d) => d.requiredTechs))
    : 0
  const incrementalHires = Math.max(0, peakRequiredTechs - techsPerShiftPerLab) * labs * shifts

  const recommendedCapacity = labs * shifts * peakRequiredTechs * capacityPerTech
  let recommendedBacklog = startingBacklog
  for (const row of days) {
    const incoming = recommendedBacklog + row.demand
    const processed = Math.min(recommendedCapacity, incoming)
    recommendedBacklog = snap(incoming - processed)
    row.backlogWithRecommendedStaff = recommendedBacklog
  }

  const totalProcessed = days.reduce((sum, row) => sum + row.processed, 0)
  const utilization = dailyCapacity > 0 && horizon > 0
    ? (totalProcessed / (dailyCapacity * horizon)) * 100
    : 0

  const daysWithBacklog = days.filter((row) => row.backlog > 0).length

  let backlogClearsOn = 'Not cleared within horizon'
  const endBacklog = days.length ? days[days.length - 1].backlog : snap(startingBacklog)
  if (endBacklog === 0) {
    let prev = snap(startingBacklog)
    let lastClear = 0
    for (const row of days) {
      if (row.backlog === 0 && prev > 0) lastClear = row.day
      prev = row.backlog
    }
    backlogClearsOn = lastClear
  }

  let status = 'green'
  if (backlogClearsOn === 'Not cleared within horizon') status = 'red'
  else if (backlogClearsOn > festivalLastDay + slaDays) status = 'amber'

  return {
    summary: {
      dailyCapacity: snap(dailyCapacity),
      peakBacklog: snap(peakBacklog),
      peakBacklogDay,
      backlogClearsOn,
      recommendedTechsPerShiftPerLab: peakRequiredTechs,
      incrementalHires,
      utilization,
      daysWithBacklog,
      status,
      festivalStart,
      festivalLastDay,
      currentTechsPerShiftPerLab: techsPerShiftPerLab,
      slaDays,
    },
    days: days.map(({ inFestival, ...row }) => row),
  }
}

let lastInputs = { ...DEFAULTS }
const runLog = []
let runSeq = 0
let nextRunAt = Date.now() + INTERVAL_MS

function recordRun(entry) {
  runLog.unshift(entry)
  if (runLog.length > 100) runLog.length = 100
}

function runJob(trigger, inputs, ordersReceived) {
  const started = Date.now()
  const result = computeSurge(inputs)
  const entry = {
    id: ++runSeq,
    timestamp: new Date().toISOString(),
    trigger,
    ordersReceived,
    peakBacklog: result.summary.peakBacklog,
    recommendedTechs: result.summary.recommendedTechsPerShiftPerLab,
    status: 'completed',
    durationMs: Date.now() - started,
  }
  recordRun(entry)
  return { result, entry }
}

function runScheduler() {
  const noise = 1 + (Math.random() * 0.3 - 0.15)
  const ordersReceived = Math.max(0, Math.round(lastInputs.baseline * noise))
  const { entry } = runJob('schedule', { ...lastInputs, baseline: ordersReceived }, ordersReceived)
  console.log(`[scheduler] run #${entry.id} completed in ${entry.durationMs}ms`)
}

const app = express()
app.use(express.json())

app.post('/api/calculate', (req, res) => {
  try {
    const inputs = parseInputs(req.body)
    lastInputs = inputs
    res.json(computeSurge(inputs))
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Calculation failed' })
  }
})

app.post('/api/webhook/orders', (req, res) => {
  try {
    const orders = Number(req.body?.orders)
    if (!Number.isFinite(orders) || orders < 0) {
      return res.status(400).json({ error: 'orders must be a non-negative number' })
    }
    lastInputs = { ...lastInputs, baseline: orders }
    const { result, entry } = runJob('webhook', lastInputs, orders)
    console.log(`[webhook] run #${entry.id} completed in ${entry.durationMs}ms`)
    res.json({ ok: true, run: entry, summary: result.summary })
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Webhook failed' })
  }
})

app.get('/api/runs', (_req, res) => {
  res.json({ runs: runLog.slice(0, 20), nextRunAt })
})

app.use(express.static(path.join(__dirname, 'public')))

setInterval(() => {
  try {
    runScheduler()
  } catch (err) {
    console.error('[scheduler] run failed', err)
  }
  nextRunAt = Date.now() + INTERVAL_MS
}, INTERVAL_MS)

const server = app.listen(PORT, () => {
  console.log(`Festival Surge Capacity Calculator running at http://localhost:${PORT}`)
  setTimeout(() => {
    try {
      runScheduler()
    } catch (err) {
      console.error('[scheduler] run failed', err)
    }
  }, 1000)
})

server.on('error', (err) => {
  console.error(err.message)
  process.exit(1)
})
