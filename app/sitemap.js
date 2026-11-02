export default function sitemap() {
  const configuredSiteUrl =
    import.meta.env?.VITE_SITE_URL ??
    globalThis.process?.env?.VITE_SITE_URL;
  const baseUrl = configuredSiteUrl?.replace(/\/+$/, '');
  if (!baseUrl) return [];

  return [{
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1
  }, {
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }, {
    url: `${baseUrl}/sermons`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9
  }, {
    url: `${baseUrl}/events`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }, {
    url: `${baseUrl}/ministries`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  }, {
    url: `${baseUrl}/give`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  }, {
    url: `${baseUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }, {
    url: `${baseUrl}/map`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5
  }, {
    url: `${baseUrl}/quick-links`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5
  }];
}
