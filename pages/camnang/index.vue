<script setup lang="ts">
// import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { MDCParserResult, Toc } from '@nuxtjs/mdc'
import get from 'lodash/get'
import { onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'

import { emitter } from '~/composables/useEmitter'

const page = ref<MDCParserResult | null>(null)
const toc = ref<Toc | undefined>(undefined)
const showToc = ref(false)
const activeHeading = ref('')

const shikiThemeCookie = useCookie('shiki-theme', {
	default: () => 'material-theme-palenight',
	maxAge: 60 * 60 * 24 * 7,
})
const selectedTheme = ref(shikiThemeCookie.value)
// eslint-disable-next-line
type MarkdownParser = (md: string) => Promise<MDCParserResult>
const parse = ref<MarkdownParser | null>(null)
watch(
	selectedTheme,
	async (theme) => {
		parse.value = await useMarkdownParser(theme)
	},
	{ immediate: true }
)
const theme = useTheme()

// eslint-disable-next-line
const neutral = computed(() => get(theme, 'global.current.value.colors.neutral', '#6B7280'))

// SHIKI SYNTAX HIGHLIGHTING SWITCHER

async function fetchMarkdown(path: string): Promise<string> {
	try {
		const response = await fetch(path)

		if (!response.ok) {
			throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`)
		}

		const text = await response.text()
		return text
	} catch (error) {
		console.error('Error fetching markdown:', error)
		return ''
	}
}

onMounted(async () => {
	const md = await fetchMarkdown('/content/index.md')

	let parsed: MDCParserResult | null = null
	if (typeof md === 'string' && parse.value) {
		parsed = await parse.value?.(md)
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
	emitter.on('theme-changed', updateTheme)
})
onUnmounted(() => {
	emitter.off('theme-changed', updateTheme)
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

const shikiPreBackground = computed(() => {
	switch (currentTheme.value) {
		case 'dark':
			return '#1A3B46'
		case 'sepia':
			return '#1A3B46'
		default:
			return '#1A3B46'
	}
})
async function loadMarkdown(theme: string) {
	try {
		const raw = await fetchMarkdown('/content/index.md')

		if (!raw) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Markdown file not found',
				fatal: true,
			})
		}

		const parser = await useMarkdownParser(theme)
		const parsed = await parser(raw)

		page.value = parsed
	} catch (error) {
		console.error('Failed to load or parse markdown:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Error loading markdown',
			fatal: true,
		})
	}
}
const updateTheme = (theme: string) => {
	selectedTheme.value = theme
}
watch(
	selectedTheme,
	(newTheme) => {
		loadMarkdown(newTheme)
	},
	{ immediate: true }
)
</script>

<template>
	<div>
		<h2 class="text-2xl font-semibold mb-2">
			Cẩm nang: Giới thiệu, hướng dẫn học về lập trình web & ứng dụng web với Vue3 và Typescript
		</h2>

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
		background-color: v-bind(shikiPreBackground);
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
