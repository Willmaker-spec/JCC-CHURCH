import { supabase } from './supabase'

const IMAGE_BUCKET = 'event-images'
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

function getEventImagePath(imageUrl) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
  if (!supabaseUrl || !imageUrl) return null

  const publicPrefix = `${supabaseUrl}/storage/v1/object/public/${IMAGE_BUCKET}/`
  return imageUrl.startsWith(publicPrefix) ? imageUrl.slice(publicPrefix.length) : null
}

export async function uploadEventImage(file) {
  if (!supabase) {
    throw new Error('Image uploads are unavailable until Supabase is configured.')
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error('Choose a JPG, PNG, WebP, or GIF image.')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Event images must be 5 MB or smaller.')
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (error) {
    console.error('Unable to upload event image:', error)
    throw new Error('Image upload failed. Confirm you are an admin and Storage is set up.')
  }

  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl
}

export async function deleteEventImage(imageUrl) {
  if (!supabase) {
    throw new Error('Image storage is unavailable until Supabase is configured.')
  }

  const path = getEventImagePath(imageUrl)
  if (!path) return

  const { error } = await supabase.storage.from(IMAGE_BUCKET).remove([path])
  if (error) {
    console.error('Unable to delete event image:', error)
    throw new Error('The event image could not be removed from storage.')
  }
}
