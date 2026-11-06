import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import seoPages from './build/seo.mjs'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return { plugins: [react(), tailwindcss(), seoPages({registrationUrl: env.VITE_SUMMIT_REGISTRATION_URL})] };
})
