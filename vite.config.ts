import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ReadStatus': {
        target: 'http://localhost:4444',
        changeOrigin: true,
        secure: false,
        ws: true, // If you are using WebSockets
        headers: {
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
  },
})
