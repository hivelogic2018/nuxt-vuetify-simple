<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// SSR-safe cookie getter
function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
	return match ? decodeURIComponent(match[2]) : null
}

const theme = ref(getCookie('monaco-theme') || 'vs-dark')

function handleThemeChange(e: CustomEvent) {
	theme.value = e.detail
	// If using Monaco, update the editor theme here
	// monaco.editor.setTheme(theme.value)
}

onMounted(() => {
	if (typeof window !== 'undefined') {
		window.addEventListener('monaco-theme-change', handleThemeChange as EventListener)
	}
})

onBeforeUnmount(() => {
	if (typeof window !== 'undefined') {
		window.removeEventListener('monaco-theme-change', handleThemeChange as EventListener)
	}
})
</script>
