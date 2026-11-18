import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'The Jubilee Christian Centre Church',
        short_name: 'Jubilee Church',
        description: 'The Jubilee Christian Centre Church — Acts 1:8.',
        theme_color: '#f8f3e7',
        background_color: '#f8f3e7',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icons/jcc-pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/jcc-pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/jcc-pwa-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(root, 'src') },
      { find: 'next/link', replacement: path.resolve(root, 'src/compat/NextLink.jsx') },
      { find: 'next/image', replacement: path.resolve(root, 'src/compat/NextImage.jsx') },
      { find: 'next/navigation', replacement: path.resolve(root, 'src/compat/NextNavigation.jsx') },
    ],
  },
})
