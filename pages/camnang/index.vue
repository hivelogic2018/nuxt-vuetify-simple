<script setup lang="ts">
// import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { MDCParserResult, Toc } from '@nuxtjs/mdc'
import get from 'lodash/get'
import { useTheme } from 'vuetify'

const page = ref<MDCParserResult | null>(null)
const toc = ref<Toc | undefined>(undefined)
const showToc = ref(false)
const activeHeading = ref('')
const parse = useMarkdownParser()

const theme = useTheme()

// eslint-disable-next-line
const neutral = computed(() => get(theme, 'global.current.value.colors.neutral', '#6B7280'))

// MONACO SYNTAX HIGHLIGHTING SWITCHER
// SSR-safe cookie getter
function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
	return match ? decodeURIComponent(match[2]) : null
}

const monacoTheme = ref(getCookie('monaco-theme') || 'vs-dark')

function handleThemeChange(e: CustomEvent) {
	monacoTheme.value = e.detail
	// If using Monaco, update the editor theme here
	// monaco.editor.setTheme(monacoTheme.value)
}

onMounted(async () => {
	const md = await $fetch('/content/index.md', {
		lazy: true,
		responseType: 'text',
	})

	let parsed: MDCParserResult | null = null
	if (typeof md === 'string') {
		parsed = await parse(md)
		if (!parsed) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Failed to parse markdown content',
				fatal: true,
			})
		}

		parsed.data.title = parsed.data?.title || 'Cẩm Nang webDev'

		useSeoMeta({
			title: parsed.data.title,
			description: parsed.data.description,
		})

		console.log('Parsed content:', parsed)

		toc.value = parsed.toc
	}

	if (typeof window !== 'undefined') {
		window.addEventListener('monaco-theme-change', handleThemeChange as EventListener)
	}

	page.value = parsed

	const observer = new IntersectionObserver(
		(entries) => {
			const visible = entries.filter((e) => e.isIntersecting)
			if (visible.length > 0) {
				const best = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
				activeHeading.value = best.target.id
			}
		},
		{ rootMargin: '0px 0px -80% 0px', threshold: [0.1, 0.5, 1] }
	)

	toc.value?.links.forEach((link) => {
		const el = document.getElementById(link.id)
		if (el) observer.observe(el)
	})
})

onBeforeUnmount(() => {
	if (typeof window !== 'undefined') {
		window.removeEventListener('monaco-theme-change', handleThemeChange as EventListener)
	}
})

const cookie = useCookie('theme-mode', {
	default: () => ({
		mode: 'system',
		primaryColor: '#3B82F6',
		neutralColor: '#6B7280',
	}),
})

const systemPrefersDark = () =>
	typeof window !== 'undefined' && window.matchMedia
		? window.matchMedia('(prefers-color-scheme: dark)').matches
		: false

const currentTheme = computed(() => {
	const mode = cookie.value?.mode ?? 'system'
	if (mode === 'system') return systemPrefersDark() ? 'dark' : 'light'
	return mode
})

const monacoPreBackground = computed(() => {
	switch (currentTheme.value) {
		case 'dark':
			return ''
		case 'sepia':
			return '#f1e7d0'
		default:
			return '#1A3B46'
	}
})

console.log('Current Monaco Theme:', monacoTheme.value, monacoPreBackground.value)
</script>

<template>
	<div>
		<h1 class="text-2xl font-semibold mb-2">
			Cẩm nang: Giới thiệu, hướng dẫn học về lập trình web ứng dụng với Vue3 và Typescript
		</h1>

		<div v-if="page" class="page-mdc-content prose dark:prose-invert">
			<v-layout>
				<v-app-bar flat>
					<v-btn icon @click="showToc = !showToc">
						<!-- <v-btn icon @click="showToc = !showToc" class="float-left"></v-btn> -->
						<v-icon>{{ showToc ? 'mdi-close' : 'mdi-format-list-bulleted' }}</v-icon>
					</v-btn>
					<v-toolbar-title>Mục lục</v-toolbar-title>
				</v-app-bar>

				<TocSidebar
					:toc="toc?.links || []"
					:is-open="showToc"
					:active-id="activeHeading"
					@update:is-open="showToc = $event"
				/>

				<v-main>
					<v-container>
						<MDCRenderer v-if="page?.body" :body="page.body" :data="page.data" class="mt-4" />
					</v-container>
				</v-main>
			</v-layout>
		</div>
		<div v-else class="text-center mt-4">
			<v-progress-circular indeterminate color="primary" />
			<p>Đang tải nội dung...</p>
		</div>
	</div>
</template>

<style scoped>
h1,
:deep(h1) {
	font-size: 24px;
	font-weight: 600;
	margin-bottom: 8px;
}

.page-mdc-content {
	padding: 0 20px 0 20px;

	:deep(pre) {
		background-color: v-bind(monacoPreBackground);
		/* bg-muted fallback */
		word-wrap: break-word;
	}
}

:deep(p) {
	margin: 0 0 16px;

	a {
		color: #4ade80;
	}
}
</style>
