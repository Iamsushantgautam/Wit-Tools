import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Wit Tools - Free Online Utilities',
        short_name: 'Wit Tools',
        description: 'Free, fast & secure all-in-one web utility suite. PDF tools, image tools, QR codes and more.',
        theme_color: '#e5322d',
        background_color: '#33333b',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
        shortcuts: [
          { name: 'PDF Compressor', url: '/pdf-compressor', description: 'Compress PDF files' },
          { name: 'Image to PDF', url: '/img-to-pdf', description: 'Convert images to PDF' },
          { name: 'BG Remover', url: '/bg-remover', description: 'Remove image background' },
          { name: 'QR Generator', url: '/qr-generator', description: 'Generate QR codes' },
        ],
        categories: ['productivity', 'utilities'],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4 MiB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/api\.remove\.bg\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/formsubmit\.co\/.*/i,
            handler: 'NetworkOnly',
          },
        ],
      },
      devOptions: {
        enabled: true, // Enable PWA in dev mode for testing
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');
          if (normalizedId.includes('/node_modules/')) {
            if (
              normalizedId.includes('/node_modules/react/') ||
              normalizedId.includes('/node_modules/react-dom/') ||
              normalizedId.includes('/node_modules/react-router/') ||
              normalizedId.includes('/node_modules/react-router-dom/') ||
              normalizedId.includes('/node_modules/scheduler/') ||
              normalizedId.includes('/node_modules/@remix-run/')
            ) {
              return 'vendor-core';
            }
            if (normalizedId.includes('/node_modules/pdfjs-dist/')) {
              return 'vendor-pdfjs';
            }
            if (normalizedId.includes('/node_modules/jspdf/')) {
              return 'vendor-jspdf';
            }
            if (normalizedId.includes('/node_modules/pdf-lib/')) {
              return 'vendor-pdflib';
            }
            if (
              normalizedId.includes('/node_modules/browser-image-compression/') ||
              normalizedId.includes('/node_modules/react-image-crop/') ||
              normalizedId.includes('/node_modules/jszip/') ||
              normalizedId.includes('/node_modules/gif.js/') ||
              normalizedId.includes('/node_modules/gifenc/')
            ) {
              return 'vendor-media';
            }
            return 'vendor-utils';
          }
        },
      },
    },
  },
  esbuild: {
    target: "es2022"
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    },
  },
})
