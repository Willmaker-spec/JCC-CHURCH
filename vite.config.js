import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(root, 'src') },
      { find: 'next/link', replacement: path.resolve(root, 'src/compat/NextLink.jsx') },
      { find: 'next/image', replacement: path.resolve(root, 'src/compat/NextImage.jsx') },
      { find: 'next/navigation', replacement: path.resolve(root, 'src/compat/NextNavigation.jsx') },
    ],
  },
})
