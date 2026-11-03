import { supabase } from './supabase'

export async function registerEvent(eventSlug, formData) {
  if (!supabase) {
    throw new Error('Registration is temporarily unavailable. Please try again later.')
  }

  const { fullName, email, phone, ...answers } = formData
  const { error } = await supabase.from('event_registrations').insert({
    event_slug: eventSlug,
    full_name: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    answers,
  })

  if (error) {
    console.error('Unable to save event registration:', error)
    throw new Error('Unable to save your registration right now. Please try again.')
  }
}
