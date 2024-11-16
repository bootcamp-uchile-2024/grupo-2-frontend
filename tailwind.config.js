/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        'gray-dark': '#393939',
      },
      fontFamily: {
        sans: ['Riffic Free', 'sans-serif'],
        h1: ['Riffic Free', 'sans-serif'],
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}