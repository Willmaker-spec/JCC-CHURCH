const API_BASE = 'https://www.googleapis.com/youtube/v3'

async function youtubeRequest(endpoint, params) {
  const query = new URLSearchParams(params)
  const response = await fetch(`${API_BASE}/${endpoint}?${query}`)
  if (!response.ok) {
    throw new Error(`YouTube API request failed (${response.status})`)
  }
  return response.json()
}

function mapVideo(item) {
  const id = typeof item.id === 'string' ? item.id : item.id?.videoId
  const snippet = item.snippet || {}

  if (!id) {
    return null
  }

  return {
    id,
    title: snippet.title || 'Untitled video',
    description: snippet.description || '',
    thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || '',
    publishedAt: snippet.publishedAt || '',
    url: `https://www.youtube.com/watch?v=${id}`,
  }
}

export function formatDate(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function getChannelVideos(channelId, apiKey, maxResults = 50) {
  const result = await youtubeRequest('search', {
    part: 'snippet',
    channelId,
    order: 'date',
    type: 'video',
    maxResults: String(maxResults),
    key: apiKey,
  })

  return (result.items || []).map(mapVideo).filter(Boolean)
}

export async function getLatestYouTubeVideo(channelId, apiKey) {
  const videos = await getChannelVideos(channelId, apiKey, 1)
  return videos[0] || null
}

export async function getChannelStats(channelId, apiKey) {
  const result = await youtubeRequest('channels', {
    part: 'statistics',
    id: channelId,
    key: apiKey,
  })

  const statistics = result.items?.[0]?.statistics
  return statistics ? { videoCount: Number(statistics.videoCount) || 0 } : null
}

export async function searchChannelVideos(channelId, apiKey, searchQuery, maxResults = 50) {
  const result = await youtubeRequest('search', {
    part: 'snippet',
    channelId,
    order: 'relevance',
    type: 'video',
    maxResults: String(maxResults),
    q: searchQuery,
    key: apiKey,
  })

  return (result.items || []).map(mapVideo).filter(Boolean)
}
