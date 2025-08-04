<script lang="ts" setup>
import { ref, watch } from 'vue'

import { emitter } from '~/composables/useEmitter'

const themes = ['monokai', 'dracula', 'material-theme-palenight', 'github-dark']

// SSR-safe helpers
// function getCookie(name: string): string | null {
// 	if (typeof document === 'undefined') return null
// 	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
// 	return match ? decodeURIComponent(match[2]) : null
// }
// function setCookie(name: string, value: string, days = 365) {
// 	if (typeof document === 'undefined') return
// 	const expires = new Date(Date.now() + days * 864e5).toUTCString()
// 	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
// }

const themeCookie = useCookie('shiki-theme', {
	default: () => 'material-theme-palenight',
	maxAge: 60 * 60 * 24 * 7,
})

const selectedTheme = ref(themeCookie.value)

const shikiThemeCookie = useCookie('shiki-theme', {
	maxAge: 60 * 60 * 24 * 7,
})

watch(selectedTheme, (newTheme) => {
	shikiThemeCookie.value = newTheme
	emitter.emit('theme-changed', newTheme)
})
</script>

<template>
	<v-select
		v-model="selectedTheme"
		:items="themes"
		label="Syntax Theme"
		dense
		outlined
		hide-details
		style="max-width: 200px"
	/>
</template>
