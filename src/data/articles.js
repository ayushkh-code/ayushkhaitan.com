export const articles = [
  {
    slug: "zepto-densification-game",
    title: "Zepto and the densification game",
    description:
      "Distance is the tax you pay on every single order. Zepto just showed the entire industry how to stop paying it.",
    date: "2026-06-22",
    content: `Zepto filed its updated DRHP (UDRHP) with SEBI in June 2026, which forced a level of financial and operational disclosure rare for a private Indian startup. That gives us audited, granular operations data (orders per day per store, fixed cost per order, delivery distance) instead of the usual speculative estimates.

So what does this mean?

Looking at these 2 tables together provides a story of the flywheel. Last mile is where the smoking gun lies. Shorter delivery distances let a rider complete more drops per hour, which lifts throughput, which spreads fixed cost across more orders, which makes each store profitable faster, which funds the next cluster of dark stores. The takeaway for anyone running a fulfillment network is that density compounds in a way that scale alone never does. You can add 800 stores and still bleed if they sit too far apart, because distance is the tax you pay on every single order. Zepto's bet was that going deep in fewer neighborhoods beats going wide across many, and the unit economics are now proving the math. However, even with all of this working, Zepto still loses roughly Rs 79/order against Blinkit's Rs 3/order, and it has no parent ecosystem to absorb the burn the way Blinkit leans on Eternal . While efficiency gains have bought them runway, net profitability still remains a question mark.`,
    images: [
      {
        src: "/writing/zepto-unit-economics-flywheel.png",
        alt: "Zepto unit economics table showing orders per day per store, marketing cost per order, EBITDA loss per order, and FCF burn per order from FY24 to FY26",
        caption:
          "Zepto | The Densification Flywheel — Unit economics progression, FY24 to FY26. Source: Zepto UDRHP (SEBI); Inc42, IPO Central, INDmoney. Compiled June 2026.",
      },
      {
        src: "/writing/zepto-operating-efficiency-gains.png",
        alt: "Zepto operating efficiency table comparing average distance per order, fixed cost per order, SKUs per dark store, and new-store time to profit from FY24 to FY26",
        caption:
          "Zepto | Operating Efficiency Gains — FY24 / Q1 FY24 vs FY26 / Q4 FY26. Source: Zepto UDRHP (SEBI); Inc42, IPO Central, RevQ. Compiled June 2026.",
      },
    ],
  },
  {
    slug: "path-to-profitability",
    title: "Path to Profitability — What Does It Entail?",
    description:
      "What Anthropic's path to a $1T valuation reveals about constrained optimization — and why the lesson applies far beyond AI.",
    date: "2026-06-21",
    image: {
      src: "/writing/anthropic-arr-trajectory.png",
      alt: "Anthropic's ARR ($B) trajectory chart showing growth from $1B in late 2024 to $50B by mid-2026",
      caption: "Source: PitchBook. Geography: US. As of June 2, 2026.",
      afterParagraph: 1,
    },
    content: `As part of my humbling (and often seemingly futile) effort to stay up to date with AI news, I recently read a PitchBook analyst report on Anthropic's expected IPO (DM me if you'd like a copy), and one observation stuck with me.

Whether or not Anthropic will continue growing remains uncontested. It will. Anthropic grew from roughly $1B ARR in late 2024 to $47B ARR by May 2026, and is expected to reach approximately $50B shortly thereafter. The real debate is around what would need to be true for a company approaching a $1T valuation to actually justify that valuation over time.

The TLDR parameters are margins, compute cost trajectory, retention of high value customers, and finally, sustaining revenue growth. Gross margins would need to remain above 40%. Compute costs would need to continue declining. Enterprise retention would need to remain exceptionally strong. Revenue would need to grow from roughly $50B today to somewhere in the neighborhood of $345B-$450B by 2030. While In isolation, these might be quite achievable, however, to collectively accomplish these without breaking the other variables is the million (well, trillion dollar) question.

Reading it reminded me of a lesson I learned repeatedly in supply chain and operations.

Strive for the theoretical maximum, yes. Though the path to profitability lies in an outcome optimized for 'multiple' constraints.

Optimizing for a single variable is achievable. Anyone can build a model that minimizes inventory. Anyone can create a transportation plan that lowers cost. Anyone can design a labor plan that improves productivity. The difficult part is achieving those outcomes while maintaining CX, protecting safety/quality, preserving flexibility, and ensuring the network can still scale as demand grows.

Some of the most interesting problems I have worked on have involved building systems where growth improved economics rather than degraded them. Can inventory be positioned closer to customers while simultaneously reducing transportation costs and not comprising the CPU of processing at scale? Can forecast accuracy improve enough to reduce both stockouts and excess inventory based on an agreeable risk appetite? Can network design improve delivery speed while lowering cost-to-serve?

Those are fundamentally constrained optimization problems.

That's why I found the Anthropic discussion so interesting. Beneath all the AI headlines, the underlying question remains unchanged. Anthropic's growth is a given. The question is whether scale will create leverage or complexity. Whether growth will become the mechanism that drives profitability, or whether profitability will remain perpetually one step behind growth. This fundamental problem statement holds true for Anthropic, Walmart, Swiggy, and Nykaa alike. The parallels hold very true, regardless of the region, or subsector.`,
  },
  {
    slug: "why-i-still-grocery-shop-in-person",
    title: "Why I Still Grocery Shop in Person",
    description:
      "A Trader Joe's trip that should have taken 30 minutes turned into 90 — and what it reveals about grocery delivery unit economics.",
    date: "2026-06-19",
    content: `Recently, I was at Trader Joe's picking up a few things for a get-together that I was hosting at my place.

A 30 minute trip turned into 90. I wandered aisles I didn't need to visit, threw things in my basket that weren't on my list, and spent longer than I care to admit debating which healthy snacks don't taste like cardboard.

I could have ordered everything online in <5 minutes. Instead, I spent $115 on spices which needed refilling, dessert (which defeated my original purpose of eating healthy), and on frozen meals because this grocery trip meant that I now didn't have time to meal prep for the week.

As someone who has spent years in e-commerce and supply chains, this gap is worth sitting with. The industry spent a decade asking whether online would take share from physical stores enough to make physical stores obsolete. Well they've taken share, but physical stores are far from obsolete. The more uncomfortable question is whether grocery delivery was ever a good business to begin with and what will it take to make online grocery financially tenable.

Grocery gross margins run 20-35%. Last-mile delivery alone consumes 50-60% of that before pick labor, packaging, shrink, payment processing, and customer acquisition costs enter the picture. Instacart's 2023 S-1 made clear its economics depend on advertising revenue, not delivery. Large e-commerce retails lose money on a per-order basis for most of its existence. Walmart Grocery, probably the most operationally efficient version of this model, only recently got to unit economics it could defend, which is driven by cart size (directly correlated to in-person store visits). The parallel justification is that grocery brings in foot traffic for positive contribution margin SKUs. This argument has it's limitations as loss-leader programs are limited by a runway to bleed money.

Delivering a $600 piece of electronics is a completely different business from delivering yogurt, bananas, and a $3.99 carton of milk. Treating them as the same channel decision is where a lot of the flawed investment logic started.

Consumer behavior compounds this. I don't shop for the same reason every time. Sometimes I want speed. Sometimes I want to pick the avocado myself because I don't trust anyone else's judgment on ripeness. Sometimes I have no idea what I want until I see it. Those aren't variations on the same mission. They carry different margin profiles and different channel requirements.

Costco runs 4%+ net margins with almost no e-commerce exposure. Trader Joe's generates an estimated $2,000 per square foot in sales productivity against an industry average closer to $500. Neither company is trying to win every channel. They built their cost structure around a specific customer mission and held the line on it.

Retail has a habit of framing these as customer experience problems. Usually they are unit economics problems that never got called by their right name.`,
  },
  {
    slug: "supply-chain-advantage-mechanisms-ai",
    title: "The Supply Chain Advantage in 2026: Mechanisms + AI",
    description:
      "Sam Walton built Walmart on mechanisms, not models. The same principle applies to getting value from AI in supply chain today.",
    date: "2026-06-14",
    content: `I was (re) reading Made in America, the story behind how Sam Walton (not Altman :)) scaled Walmart into the behemoth it is today. While the details are now outdated, the operating principles are still relevant.

The advantage came from mechanisms. Tight cadence. Clear ownership. Simple rules that scaled across thousands of decisions. The same themes show up in supply chain teams trying to get value from AI today.

AI can absolutely help. Better forecasts, smarter replenishment, faster routing decisions, cleaner inventory placement. The question is whether the organization can turn those outputs into action without creating more noise. In 2026, the differentiator will look less like "who has AI" and more like "who has mechanisms that AI can plug into."

Clean mechanisms are boring, mundane, simple. Trusted, consistent metrics; daily-owned exception queues; clear decision rights and simple rules that prevent re-debates; fast feedback loops that update assumptions quickly.

When those basics are weak, AI does not save you. It floods the system with more signals, more alerts, more dashboards. The work does not move faster.

There is a second supply chain here too. AI itself is an infrastructure build. Compute, networking, power, cooling, commissioning. Speed comes from planning end-to-end and managing constraints upstream. That is old school supply chain.

The takeaway I keep coming back to: AI will raise the ceiling, but mechanisms decide the pace.

This takes me back to the famous Jeff-ism that I think still holds true - "Good intentions never work, but good mechanisms do".`,
  },
  {
    slug: "ai-speed-war-infrastructure",
    title: "AI Is a Speed War, and Speed Is an Infrastructure Supply Chain Problem",
    description:
      "The AI race is a race to deploy compute. Whoever brings infrastructure online faster wins the iteration cycle.",
    date: "2026-06-11",
    content: `The AI race right now is mostly a race to deploy. Whoever can bring compute online faster can train sooner, iterate sooner, and ship sooner. Model quality still matters, but the pace of iteration is starting to be the advantage.

That turns "AI strategy" into a very physical problem.

A working AI cluster is a long chain of dependencies. GPUs are the headline, but they are only one piece. Advanced packaging and high bandwidth memory sit upstream. Then come servers, NICs, switches, optics, cables, racks, power supplies, and cooling. After that you hit the biggest constraint that no one can "scale with code": data center power and grid timelines.

This is why the bottleneck is a moving target. One quarter it is accelerator supply. Next it is packaging capacity. Then it is rack integration. Then it is power delivery. Teams feel it as schedule slip and idle capacity. Finance feels it as capital sitting unproductive. Leadership feels it as missed product timelines.

The companies that are winning treat infrastructure like a product:

They lock long lead time items early.

They standardize designs so deployment is repeatable.

They run an explicit risk register across components, vendors, and power.

They build decision rules for speed vs cost, because in a speed war, paying for time is often rational.

A lot of the discourse about AI stays in the model layer. The real constraint for many teams is getting stable compute online at scale, fast, and keeping it fed with power and networking.

If you are building in AI today, what has slowed you down more: hardware availability, data center power, or networking and rack integration?`,
  },
  {
    slug: "agentic-ai-sop-eisenhower",
    title: "Plans Are Worthless, Planning Is Everything",
    description:
      "What Eisenhower understood about planning applies directly to modern S&OP, and agentic AI is about to change how we operationalize it.",
    date: "2026-06-15",
    content: `Dwight D. Eisenhower said it best. Plans are worthless, but planning is everything.

Every S&OP leader has lived this sentence without knowing they were quoting or at the very least embodying the words of a five-star general.

The weekly/monthly plan you build is obsolete the moment demand shifts, a Suez canal bottleneck occurs, or as new tariffs get announced via a formalized 140 character social media message. I have watched carefully built production plans unravel in a single week because of one upstream disruption. The plan itself rarely survives contact with reality.

But then, planning isn't futile. It opens up the "what-if" dialogue. It creates scenarios to minimize the amount of time spent in reactive discussions. What if Forecast WAPE was 500 bps above tolerance limits due to demand not materializing, or a large inbound shipment arrived early which led to a yard gridlock. That muscle memory is what lets a team react in hours instead of weeks when the real disruption shows up.

Here's where Agentic AI comes in. Agentic AI models are as good as we train them and find use cases for. The math already exists and has been done and redone multiple times. This is now data that we can utilize to feed Agentic AI models to model out the outcomes of multivariate changes, as opposed to changing inputs on Excel and running crude sensitivity models.

The plan is still worthless if these variables change unless we think through the what-if scenarios. Winning the planning game boils down to our ability to ingest history, identify the scenarios where "quick napkin math" was needed, and to operationalize them into Agentic models. The opportunity cost of leaders' time is the resource that becomes relevant here. Is it better served in repeating permutations of this crude modeling? I think not.

The true value lies in taking pause to (i) have a very high bar for avoiding the avoidable models and scenario testing reactively, and (ii) utilizing this new-found time to actually drive strategy and execution. Move the needle where it counts.`,
  },
  {
    slug: "five-step-agentic-sop-fix",
    title: "Five Steps to Fix a Broken S&OP Process with Agentic AI",
    description:
      "A practical framework for using agentic AI to modernize stale demand planning cadences.",
    date: "2026-06-10",
    content: `So, how do you use agentic AI to fix a broken or stale S&OP process? Here's a five step strategy to change this.

A new AI model ships every few hours, but demand planning cadences still follow the same shell that was created years ago. It's time to adapt. Most S&OP processes are stale because they're built around WBRs and MBRs that follow the same format every week, and quarterly business reviews that take four weeks to prep and indefinite weeks to follow up on with ETAs that keep getting pushed out. Bridging already automated dashboard reports takes up more time than the actual fixes.

Agentic AI changes what a human is actually needed for in this process.

Step 1: Define variables. Topline error, WAPE at each business unit and region grain (plan vs actuals), and week-to-week variance in actuals.

Step 2: Define guardrails based on absolute deviation (units, revenue, etc), percentage points for each relevant grain (200 bps in either direction, for example), and variation over a time period (YoY or WtW variation beyond 5%).

Step 3: Automate all the "reading the news" actions and auto publish to key leaders and owners. This should replace or supplement the 50 page decks that exist today but never get actioned.

Step 4: Triage 80% of root causing to AI. Most root causing and bridge building is repeatable, like simulation inputs being off, demand forecasts being miscalibrated, or execution missing its target. These can be linked to an indicator metric to build waterfall logic. The remaining 20% of cases shouldn't all go to humans either. Only triage manually if they move the needle defined in step 2.

Step 5: Reinforcement learning. AI is only as good as the feedback we give it. Allocate two weeks to proof test this approach and move to production in three weeks with a generous feedback system to tighten guardrails, communication preferences, and most importantly, cut information that is not actionable. Noise information is a waste of resources, both to generate as well as in camouflaging the relevant information.

The planner's job moves from finding the problem to deciding what to do about it. Move the needle instead of talking about the needle.`,
  },
  {
    slug: "willy-wonka-supply-chain",
    title: "Inside Willy Wonka's Supply Chain",
    description:
      "A look at the Golden Ticket announcement as a high volume demand event, and what it would take to actually plan for it.",
    date: "2026-06-15",
    content: `I was recently rewatching Charlie and the Chocolate Factory.

Call it an unintended side effect of being in Operations for too long, but I found myself thinking from an operations perspective on what it would take this Chocolatier/CEO to pull off a successful high volume event (HVE) from a Golden Ticket announcement.

From a business perspective, Wonka had just announced a global event that would fundamentally change consumer behavior. People were no longer buying chocolate simply because they wanted chocolate. Every bar now carried the possibility of something more valuable.

Problem statement: How do you prepare a supply chain for a demand event with no historical precedent while balancing growth, customer experience, working capital, and spoilage risk?

This was the first HVE of its kind, with no historical demand signal to anchor against. Willy Wonka (I'll call him WW to maintain the gravitas of this post) would need to plan for materials, labor, spoilage, working capital, and distribution capacity, all while maintaining customer experience and product quality.

There are dozens of dimensions a planning team would need to consider, but I kept coming back to three that would likely be the focus of every executive review.

1) Production

The strategic decision becomes how much additional capacity should be committed before there was any evidence of actual demand. Do we undertake fixed cost or mechanical adjustments to scale up capacity for a seasonal event? If this has potential for incremental long-term free cash flow from the new customers, accounting for how many of the new customers stick around to try a WW bar, then maybe. If not, we flex up using more flexible levers. This decision will depend on risk appetite to deploy capex.

Now, once the capacity math is accounted for, we'll need to account for how much quantity to actually produce for. Producing too aggressively would require securing additional raw materials, expanding labor capacity, and tying up cash in inventory that might never be sold. Producing too conservatively would increase the likelihood of stockouts during the exact period when consumer excitement was highest.

Add on a layer of complexity that chocolate is perishable from natural expiry as well as from weather exposure. Every incremental unit produced ahead of demand begins accumulating age, storage costs, and spoilage risk. The same inventory that protects service levels during a demand surge can become a liability if demand falls short of expectations.

2) Distribution

Production is only useful if product is sitting in the right place at the right time. Distribution will need to be optimized based on which regions have strategic value, such as low penetration markets, which regions currently account for the largest share of demand, and which regions, while not accounting for the largest baseline demand, account for the largest price sensitivity and therefore the most incremental demand opportunity. Some regions would inevitably react more strongly than others, but there was no historical precedent to indicate where those spikes would occur. Inventory positioned too aggressively would create pockets of excess stock. Inventory positioned too conservatively would leave empty shelves in the very markets where excitement was highest. By the time demand became visible, much of the opportunity would already be gone.

3) Risk appetite and sensitivity

Forecasting is most effective when the future resembles the past. WW had deliberately created a demand driver that had never existed before. At some point, the discussion would stop being about forecast accuracy and start becoming a conversation about uncertainty. How much working capital is the business willing to commit? How much downside inventory exposure was acceptable? How much operational flexibility was worth paying for? To add to these, a dynamic scenario analysis of how operations will adapt with every subsequent ticket being discovered will be key, for example what happens if the first ticket is discovered with only 80% of the expected demand being met. Scenario modeling will be key here, and a playbook to accompany this will be crucial. If X happens, how do we react, and what will be the decision tree of each scenario. The goal is to cut reaction time to the minimum. Long before the first Golden Ticket was discovered, those decisions will already have been made. Everything else becomes execution and following the playbook once the promotion is announced.

This is a simplified version of a very comprehensive strategy which will require planning at a SKU level, evaluating demand spikes and drops to reduce "peakiness" and impact to the supply chain, and optimizing for cost structure to make this growth sustainable. Somewhere beneath the chocolate rivers and edible fountains sits a surprisingly complex supply chain problem. I'll wait for Warner Bros. Entertainment for a more business oriented sequel. I'd watch that.`,
  },
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}

export function formatArticleDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getSortedArticles() {
  return [...articles].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );
}
