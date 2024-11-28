/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '300px': '300px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        'gray-dark': '#393939',
        'yellow': '#F4B40C',
        'purple': "#4E3B7F"
      },
      fontFamily: {
        riffic: ["Riffic", "Riffic free", "sans-serif"], // Agregar la fuente personalizada
        lato: ['Lato', 'Riffic', 'sans-serif']
      },
      fontSize: {
        'custom-lg': ['48px', '56px'], // font-size con line-height
        'custom-s': ['16px', '24px'],
      },
      fontWeight: {
        normal: 400, // Ya está por defecto, pero puedes asegurarte de incluirlo si lo necesitas
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}