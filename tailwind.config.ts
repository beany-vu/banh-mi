import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#1DA1F2',
				secondary: '#14171A',
				accent: '#657786',
				background: '#F5F8FA',
				border: '#E1E8ED'
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Merriweather', 'serif']
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
