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
        'gray-dark-67': '#676768',
        'yellow': '#F4B40C',
        'yellow-900': '#D59B03',
        'purple': "#4E3B7F",
        'purple-100': "#675594",
        "gray-G05": "#000000",
        "gray-100": "#D9D8DB",
        "white-100": "#FBFAFC",
      },
      fontFamily: {
        riffic: ["Riffic", "Riffic free", "sans-serif"], // Agregar la fuente personalizada
        lato: ['Lato', 'Riffic', 'sans-serif']
      },
      fontSize: {
        'custom-lg': ['48px', '56px'], // font-size con line-height
        'custom-4xl': ['36px', '44px'],
        'custom-3xl': ['30px', '40px'],
        'custom-2xl': ['24px', '36px'],
        'custom-l': ['20px', '30px'],
        'custom-m': ['18px', '28px'],
        'custom-s': ['16px', '24px'],
        'custom-xs': ['14px', '21px'],
        'custom-r-2xl': ['24px', '40px'],
      },
      fontWeight: {
        normal: 400, // Ya está por defecto, pero puedes asegurarte de incluirlo si lo necesitas
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}