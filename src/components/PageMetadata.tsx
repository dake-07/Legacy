import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import site from '../data/site-metadata.json'

export function PageMetadata() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/+$/, '') || '/'
  const canonicalPath = path === '/gallery' ? '/portfolio' : path
  const page = site.pages[canonicalPath as keyof typeof site.pages]
  const metadata = page || site.notFound
  const canonical = page ? `${site.origin}${canonicalPath}` : undefined

  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="robots" content={page ? 'index, follow' : 'noindex, follow'} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={`${site.origin}${site.image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={site.imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={`${site.origin}${site.image}`} />
      <meta name="twitter:image:alt" content={site.imageAlt} />
      {canonicalPath === '/' && (
        <script type="application/ld+json">{JSON.stringify(site.structuredData).replace(/</g, '\\u003c')}</script>
      )}
    </Helmet>
  )
}
