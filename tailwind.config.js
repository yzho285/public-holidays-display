import { defineConfig } from '@tailwindcss/postcss'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'canada-red': '#FF0000',
        'canada-white': '#FFFFFF',
      }
    },
  },
})