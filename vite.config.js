import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'faith of the catholic church',
      short_name: 'fotcc',
      description: 'book as app for faith of the catholic church',
      theme_color: '#d4af37',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  }),
    tailwindcss,
  ],
})