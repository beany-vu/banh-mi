import containerQueries from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#1DA1F2',
				secondary: '#14171A',
				accent: '#657786',
				background: '#E1E8ED',
				border: '#AAB8C2'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Merriweather', 'serif']
			}
		}
	},
	plugins: [containerQueries, daisyui],
	daisyui: {
		themes: [
			{
				cupcake: {
					...themes['cupcake'],
					'--rounded-box': '0.5rem',
					'--rounded-btn': '0.5rem'
				}
			}
		]
	}
} satisfies Config;
