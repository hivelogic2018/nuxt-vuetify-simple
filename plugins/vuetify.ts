import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

 
const customThemes2 = {
	light: {
		dark: false,
		colors: {
			background: '#FFFFFF',
			surface: '#F8F9FA',
			primary: '#3B82F6',
			neutral: '#6B7280',
		}
	},
	dark: {
		dark: true,
		colors: {
			background: '#121212',
			surface: '#1E1E1E',
			primary: '#3B82F6',
			neutral: '#71717A',
		}
	},
	sepia: {
		dark: false,
		colors: {
			background: '#F1E7D0',
			surface: '#EAD7B7',
			primary: '#F59E0B',
			neutral: '#433422',
		}
	}
}

const customThemes = {
	light: {
		dark: false,
		colors: {
			background: '#FFFFFF',
			surface: '#FFFFFF',
			primary: '#3B82F6', // Default: Blue
			neutral: '#64748B', // Slate
		},
	},
	dark: {
		dark: true,
		colors: {
			background: '#121212',
			surface: '#1E1E1E',
			primary: '#3B82F6',
			neutral: '#71717A',
		},
	},
	sepia: {
		dark: false,
		colors: {
			background: '#F4ECD8',
			surface: '#E9DBC3',
			primary: '#704214',
			neutral: '#A67B5B',
		},
	},
}

export default defineNuxtPlugin(nuxtApp => {
	const vuetify = createVuetify({
		components,
		directives,
		theme: {
			defaultTheme: 'light',
			themes: customThemes,
		},
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: { mdi },
		},
	})

	nuxtApp.vueApp.use(vuetify)
})