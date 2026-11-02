import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Check for Cloudinary unsigned preset config
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
    if (!cloudName || !uploadPreset) {
      return NextResponse.json({ error: 'Upload not configured' }, { status: 501 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as Blob | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', uploadPreset)

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    const r = await fetch(url, { method: 'POST', body: fd })
    const j = await r.json()
    if (!r.ok) return NextResponse.json({ error: 'Upload failed', details: j }, { status: 502 })

    return NextResponse.json({ ok: true, url: j.secure_url })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg || 'Bad Request' }, { status: 400 })
  }
}
