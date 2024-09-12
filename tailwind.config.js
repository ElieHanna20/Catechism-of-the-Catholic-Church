/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.html", // Include all HTML files in the root and subdirectories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
