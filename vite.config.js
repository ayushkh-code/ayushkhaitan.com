import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { staticPages } from './src/data/pageMeta.js'

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`static-page-meta: could not find ${label} in index.html`)
  return html.replace(pattern, replacement)
}

function withPageMeta(html, meta) {
  const metaTag = (attr, key, content) =>
    replaceOnce(
      html,
      new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/>`),
      `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`,
      key,
    )
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`, '<title>')
  html = metaTag('name', 'description', meta.description)
  html = metaTag('property', 'og:title', meta.ogTitle)
  html = metaTag('property', 'og:description', meta.ogDescription)
  html = metaTag('property', 'og:url', meta.ogUrl)
  return html.replace('</head>', `  <link rel="canonical" href="${escapeHtml(meta.canonical)}" />\n  </head>`)
}

// Link previews and crawlers don't run JavaScript, so each page in staticPages gets
// its own HTML file with the right head tags. Vercel serves these before the SPA rewrite.
function staticPageMeta() {
  return {
    name: 'static-page-meta',
    apply: 'build',
    writeBundle({ dir }) {
      const indexHtml = readFileSync(join(dir, 'index.html'), 'utf8')
      for (const page of staticPages) {
        const pageDir = join(dir, page.path)
        mkdirSync(pageDir, { recursive: true })
        writeFileSync(join(pageDir, 'index.html'), withPageMeta(indexHtml, page))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticPageMeta()],
})
