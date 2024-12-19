/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/flyonui/dist/js/*.js"
	],
	theme: {
		screens: {
			'sm': '640px',
			// => @media (min-width: 640px) { ... }

			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
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
				'gray-dark-10': '#ADACAE',
				'yellow': '#F4B40C',
				'yellow-900': '#D59B03',
				'purple': "#4E3B7F",
				'purple-100': "#675594",
				'purple-200': "#8F7EB8",
				"gray-G05": "#000000",
				"gray-100": "#D9D8DB",
				"white-100": "#FBFAFC",
				"gray-figma": "#E5E5E5"

			},
			fontFamily: {
				riffic: ["Riffic", "Riffic free", "sans-serif"], // Agregar la fuente personalizada
				lato: ['Lato', 'Riffic', 'sans-serif']
			},
			boxShadow: {
				'custom-card': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)', // Convierte #00000040 a rgba
			},
			fontSize: {
				'custom-lg': ['48px', '56px'], // font-size con line-height
				'custom-r-6xl': ['60px', '72px'],
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
			zIndex: {
				'999': '999',
			},
		}
	},
	flyonui: {
		themes: ['light'],
	},
	plugins: [
		require('tailwindcss-animate'),
		require('flyonui'),
		require('flyonui/plugin')
	],
}