import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import { resolve } from 'path'

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

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),  // Main page
        page1: resolve(__dirname, 'pages/الجزء-الاول.html'),  // Example additional page
        page2: resolve(__dirname, 'pages/الجزء-الثاني.html'),  // Example additional page
        page3: resolve(__dirname, 'pages/الجزء-ثالث.html'),  // Example additional page
        page4: resolve(__dirname, 'pages/الجزء-الرابع.html'),  // Example additional page
        page5: resolve(__dirname, 'pages/شرح-البنية.html'),  // Example additional page
      },
    },
  },
})
