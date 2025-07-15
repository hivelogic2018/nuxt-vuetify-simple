<template>
	<v-select
		v-model="selectedTheme"
		:items="themes"
		label="Syntax Theme"
		dense
		outlined
		hide-details
		style="max-width: 200px"
		@change="onThemeChange"
	/>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

const themes = [
	'vs', // VSCode Light
	'vs-dark', // VSCode Dark
	'monokai',
	'dracula',
	'github',
	'github-dark',
]

// SSR-safe helpers
function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
	return match ? decodeURIComponent(match[2]) : null
}
function setCookie(name: string, value: string, days = 365) {
	if (typeof document === 'undefined') return
	const expires = new Date(Date.now() + days * 864e5).toUTCString()
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

const selectedTheme = ref('vs-dark')

// Only access cookies/client APIs on client
onMounted(() => {
	const cookieTheme = getCookie('monaco-theme')
	if (cookieTheme && themes.includes(cookieTheme)) {
		selectedTheme.value = cookieTheme
	} else {
		setCookie('monaco-theme', selectedTheme.value)
	}
})

function onThemeChange(theme: string) {
	setCookie('monaco-theme', theme)
	if (typeof window !== 'undefined') {
		window.dispatchEvent(new CustomEvent('monaco-theme-change', { detail: theme }))
	}
}

// Keep cookie in sync if changed elsewhere
watch(selectedTheme, (theme) => {
	setCookie('monaco-theme', theme)
})
</script>