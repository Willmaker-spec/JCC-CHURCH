import { supabase } from './supabase'

const IMAGE_BUCKET = 'devotional-images'
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export async function uploadDevotionalImage(file) {
  if (!supabase) {
    throw new Error('Image uploads are unavailable until Supabase is configured.')
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error('Choose a JPG, PNG, WebP, or GIF image.')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Images must be 5 MB or smaller.')
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (error) {
    console.error('Unable to upload devotional image:', error)
    throw new Error('Image upload failed. Confirm you are an admin and Storage is set up.')
  }

  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl
}
