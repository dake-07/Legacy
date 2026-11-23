import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const site = JSON.parse(await readFile(path.join(root, 'src/data/site-metadata.json'), 'utf8'))
const template = await readFile(path.join(root, 'dist/index.html'), 'utf8')
const marker = /<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->/
if (!marker.test(template)) throw new Error('SEO markers are missing from the built HTML')
const escape = value => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

function renderHead(route, page) {
  const canonical = page ? `${site.origin}${route}` : undefined
  const metadata = page || site.notFound
  const meta = (attribute, name, value) => `<meta data-rh="true" ${attribute}="${name}" content="${escape(value)}" />`
  const tags = [
    `<title>${escape(metadata.title)}</title>`,
    meta('name', 'description', metadata.description),
    meta('name', 'robots', page ? 'index, follow' : 'noindex, follow'),
    ...(canonical ? [`<link data-rh="true" rel="canonical" href="${canonical}" />`] : []),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', site.name),
    meta('property', 'og:title', metadata.title),
    meta('property', 'og:description', metadata.description),
    ...(canonical ? [meta('property', 'og:url', canonical)] : []),
    meta('property', 'og:image', `${site.origin}${site.image}`),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', site.imageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', metadata.title),
    meta('name', 'twitter:description', metadata.description),
    meta('name', 'twitter:image', `${site.origin}${site.image}`),
    meta('name', 'twitter:image:alt', site.imageAlt),
  ]
  if (route === '/') tags.push(`<script data-rh="true" type="application/ld+json">${JSON.stringify(site.structuredData).replace(/</g, '\\u003c')}</script>`)
  return `<!-- SEO:start -->\n${tags.join('\n')}\n<!-- SEO:end -->`
}

// Give crawlers and social previews route-specific metadata without waiting for JavaScript.
// The React content continues to render normally; this is metadata generation, not SSR.
for (const [route, page] of Object.entries(site.pages)) {
  const filename = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  await writeFile(path.join(root, 'dist', filename), template.replace(marker, () => renderHead(route, page)))
}
await writeFile(path.join(root, 'dist/gallery.html'), template.replace(marker, () => renderHead('/portfolio', site.pages['/portfolio'])))
await writeFile(path.join(root, 'dist/404.html'), template.replace(marker, () => renderHead('/404', undefined)))

// Detect stale domains or missing routes before shipping the sitemap.
const sitemap = await readFile(path.join(root, 'public/sitemap.xml'), 'utf8')
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
const expected = Object.keys(site.pages).map(route => `${site.origin}${route}`)
if (JSON.stringify([...locations].sort()) !== JSON.stringify(expected.sort())) throw new Error('Sitemap URLs do not match the public page catalogue')
console.log(`Generated search metadata for ${Object.keys(site.pages).length} pages, the gallery alias, and the 404 page.`)
