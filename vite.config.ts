import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative paths so the site works on GitHub Pages under any repo name
  // (e.g. username.github.io/portfolio/) as well as on Vercel / Netlify.
  base: './',
})
