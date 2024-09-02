import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss,
  ],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),  // Main page
        // additional pages
        page1: resolve(__dirname, 'pages/الجزء-الاول.html'),
        page2: resolve(__dirname, 'pages/الجزء-الثاني.html'),
        page3: resolve(__dirname, 'pages/الجزء-ثالث.html'),
        page4: resolve(__dirname, 'pages/الجزء-الرابع.html'),
        page5: resolve(__dirname, 'pages/شرح-البنية.html'),
      },
    },
  },
})
