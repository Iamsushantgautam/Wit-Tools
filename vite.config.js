import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: "es2022" // Ensure support for modern JS often used in PDF libraries
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    },
  },
})
