import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Don't fail build on TypeScript errors
    reportCompressedSize: false,
  },
})
