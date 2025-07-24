import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    proxy: {
      "/download": "https://api-prediksi.psti-ubl.id/"
    }
  },
  plugins: [react()],
})
