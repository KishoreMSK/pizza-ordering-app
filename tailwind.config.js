/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily:{
      sans: 'Roboto Mono, monospace',
    },
    //keep the original things of tailwind and adding our own styles
    extend: {
      fontSize: {
        huge: ['80rem', { lineHeight: '1'}],
      },
      height: {
        screen: '100dvh', //dynamic view height - will adjust in all screen
      }
    },
  },
  plugins: [],
}

