'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DevotionalDetailClient from '@/components/DevotionalDetailClient'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default function DevotionalPage() {
  const { slug } = useParams()
  const [devotional, setDevotional] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true

    async function loadDevotional() {
      if (!isSupabaseConfigured || !supabase) {
        setStatus('unconfigured')
        return
      }

      const { data, error } = await supabase
        .from('devotionals')
        .select('*')
        .eq('id', slug)
        .limit(1)
        .single()

      if (!active) return
      if (error) {
        console.error('Unable to load devotional:', error)
        setStatus('error')
        return
      }
      if (!data) {
        setStatus('not-found')
        return
      }

      setDevotional(data)
      setStatus('loaded')
      document.title = `${data.title || 'Devotional'} | Jubilee Christian Centre Church`
    }

    loadDevotional()
    return () => {
      active = false
    }
  }, [slug])

  if (status === 'loading') {
    return <p className="px-6 py-24 text-center">Loading devotional…</p>
  }
  if (status === 'unconfigured') {
    return (
      <p className="px-6 py-24 text-center">
        Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to load devotionals.
      </p>
    )
  }
  if (status !== 'loaded') {
    return (
      <p className="px-6 py-24 text-center">
        {status === 'not-found' ? 'Devotional not found.' : 'Devotional could not be loaded.'}
      </p>
    )
  }

  return <DevotionalDetailClient devotional={devotional} />
}
