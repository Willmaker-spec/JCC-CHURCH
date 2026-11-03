import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DevotionalDetailClient from '@/components/DevotionalDetailClient'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default function DevotionalPage() {
  const { slug } = useParams()
  const [devotional, setDevotional] = useState(null)
  const [status, setStatus] = useState(isSupabaseConfigured ? 'loading' : 'unconfigured')

  useEffect(() => {
    if (!supabase) return undefined
    let active = true

    async function loadDevotional() {
      setStatus('loading')
      try {
        const { data, error } = await supabase
          .from('devotionals')
          .select('id, title, image, content, scheduled_date, created_at')
          .eq('id', slug)
          .lte('scheduled_date', new Date().toISOString())
          .maybeSingle()

        if (!active) return
        if (error) throw error
        if (!data) {
          setDevotional(null)
          setStatus('not-found')
        } else {
          setDevotional(data)
          setStatus('loaded')
          document.title = `${data.title || 'Devotional'} | Jubilee Christian Centre Church`
        }
      } catch (error) {
        if (!active) return
        console.error('Unable to load devotional:', error)
        setStatus('error')
      }
    }

    loadDevotional()
    return () => {
      active = false
    }
  }, [slug])

  if (status === 'loading') return <p className="px-6 py-24 text-center">Loading devotional…</p>
  if (status === 'unconfigured') {
    return <p className="px-6 py-24 text-center">Add the Supabase project URL and publishable key to .env.</p>
  }
  if (status !== 'loaded') {
    return <p className="px-6 py-24 text-center">{status === 'not-found' ? 'Devotional not found.' : 'Devotional could not be loaded. Check the Supabase database setup and try again.'}</p>
  }

  return <DevotionalDetailClient devotional={devotional} />
}
