import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default function DevotionalPage() {
  const { slug } = useParams()
  const [result, setResult] = useState(null)
  const status = !isSupabaseConfigured
    ? 'unconfigured'
    : result?.slug === slug
      ? result.status
      : 'loading'
  const devotional = result?.slug === slug ? result.devotional : null

  useEffect(() => {
    if (!supabase || !slug) {
      return undefined
    }

    let active = true
    async function loadDevotional() {
      const { data, error } = await supabase
        .from('devotionals')
        .select('*')
        .eq('id', slug)
        .maybeSingle()

      if (!active) {
        return
      }

      if (error) {
        console.error('Unable to load devotional:', error)
        setResult({ slug, status: 'error', devotional: null })
        return
      }

      setResult({
        slug,
        devotional: data,
        status: data ? 'ready' : 'not-found',
      })
    }

    loadDevotional().catch(error => {
      if (active) {
        console.error('Unable to load devotional:', error)
        setResult({ slug, status: 'error', devotional: null })
      }
    })

    return () => {
      active = false
    }
  }, [slug])

  return (
    <article className="min-h-screen px-6 py-24">
      {status === 'loading' && <p className="text-center">Loading devotional…</p>}
      {status === 'unconfigured' && (
        <p role="alert" className="mx-auto max-w-2xl text-center text-red-700">
          Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to load devotionals.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mx-auto max-w-2xl text-center text-red-700">
          This devotional could not be loaded. Please try again later.
        </p>
      )}
      {status === 'not-found' && (
        <p className="text-center text-gray-600">Devotional not found.</p>
      )}
      {status === 'ready' && devotional && (
        <div className="mx-auto max-w-4xl">
          {devotional.image && (
            <img className="mb-8 max-h-[32rem] w-full object-cover" src={devotional.image} alt="" />
          )}
          <h1 className="mb-3 text-4xl font-bold">{devotional.title}</h1>
          <time className="mb-8 block text-sm text-gray-500">
            {devotional.scheduled_date || devotional.created_at}
          </time>
          <div className="whitespace-pre-wrap leading-relaxed">{devotional.content}</div>
        </div>
      )}
    </article>
  )
}
