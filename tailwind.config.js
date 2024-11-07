/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			transitionTimingFunction: {
			  'custom-ease': 'cubic-bezier(0.5, 0.5, 0, 1)',
			  'custom-ease-2': 'cubic-bezier(.2, 1.33, .25, 1)',
			},
			transitionDuration: {
				'700': '700ms',
				'600': '600ms',
			},
			colors: {
				'custom-border': '#d2c1cb',
			},
		},
	},
	plugins: [
		function({ addUtilities }) {
			const newUtilities = {
			  '.translate-rotate': {
				transform: 'translateX(calc(-101% + 5vw)) rotate(0.001deg)',
			  },
			}
			addUtilities(newUtilities, ['responsive', 'hover'])
		  },
	],
}