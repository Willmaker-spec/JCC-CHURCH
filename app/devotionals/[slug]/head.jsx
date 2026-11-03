export default async function Head({ params }) {
  const id = params.slug
  const siteUrl = (import.meta.env?.VITE_SITE_URL || '').replace(/\/$/, '')
  const fallbackRel = '/images/jcc-logo.png'
  const fallback = siteUrl ? `${siteUrl}${fallbackRel}` : fallbackRel
  const title = 'Devotional'
  const description = 'Devotional from JCC'
  const image = fallback
  const absoluteImage = /^https?:\/\//i.test(image)
    ? image
    : siteUrl
      ? `${siteUrl}/${image.replace(/^\//, '')}`
      : image
  const pageUrl = siteUrl ? `${siteUrl}/devotionals/${id}` : `/devotionals/${id}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </>
  )
}
