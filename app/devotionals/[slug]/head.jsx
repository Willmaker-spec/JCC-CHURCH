import { isSupabaseConfigured, supabase } from '@/lib/supabase'

function stripMarkdown(markdown = '') {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[`*_>#]/g, '')
    .replaceAll('[', '')
    .replaceAll(']', '')
    .replaceAll('(', '')
    .replaceAll(')', '')
    .replace(/\s+/g, ' ')
    .trim()
}

export default async function Head({ params }) {
  const id = params.slug
  const siteUrl = (import.meta.env?.VITE_SITE_URL || '').replace(/\/$/, '')
  const fallbackRel = '/images/jcc-logo.png'
  const fallback = siteUrl ? `${siteUrl}${fallbackRel}` : fallbackRel
  let devotional = null

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('devotionals')
        .select('*')
        .eq('id', id)
        .limit(1)
        .single()
      if (error) throw error
      devotional = data
    } catch (error) {
      console.error('Unable to load devotional metadata:', error)
    }
  }

  const title = devotional?.title || 'Devotional'
  const excerpt = stripMarkdown(devotional?.content || '').slice(0, 140)
  const description = excerpt ? `${title} — ${excerpt}` : 'Devotional from JCC'
  const image = devotional?.image || fallback
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
