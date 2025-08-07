<script setup lang="ts">
import type { MDCParserResult, Toc } from '@nuxtjs/mdc'

const page = ref<MDCParserResult | null>(null)
const toc = ref<Toc | undefined>(undefined)
const showToc = ref(true)
const activeHeading = ref('')
const isScrolled = ref(false)
const readingProgress = ref(0)
const isMobile = ref(false)
const parse = useMarkdownParser()
const monacoTheme = ref(getCookie('monaco-theme') || 'vs-dark')

function toggleToc() {
	showToc.value = !showToc.value
}
function closeToc() {
	showToc.value = false
}
function getCookie(name: string) {
	return typeof document !== 'undefined'
		? document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))?.[2]
		: null
}

function handleThemeChange(e: CustomEvent) {
	monacoTheme.value = e.detail
}

function scrollToElement(id: string) {
	const element = document.getElementById(id)
	if (element) {
		const headerHeight = 110
		const elementPosition = element.offsetTop - headerHeight
		window.scrollTo({ top: elementPosition, behavior: 'smooth' })
		activeHeading.value = id
		if (isMobile.value) showToc.value = false
	}
}

function handleTocClick(id: string, event: Event) {
	event.preventDefault()
	scrollToElement(id)
}

function handleQuickNavClick(id: string, event: Event) {
	event.preventDefault()
	scrollToElement(id)
}

function shareContent() {
	if (navigator.share && page.value?.data?.title) {
		navigator
			.share({ title: page.value.data.title, url: window.location.href })
			.catch((err) => console.log('Error sharing:', err))
	} else {
		navigator.clipboard
			.writeText(window.location.href)
			.then(() => console.log('Link copied to clipboard'))
	}
}

const cookie = useCookie('theme-mode', {
	default: () => ({ mode: 'system', primaryColor: '#3B82F6', neutralColor: '#6B7280' }),
})
const systemPrefersDark = () =>
	typeof window !== 'undefined' && window.matchMedia
		? window.matchMedia('(prefers-color-scheme: dark)').matches
		: false

const currentTheme = computed(() =>
	(cookie.value?.mode ?? 'system') === 'system'
		? systemPrefersDark()
			? 'dark'
			: 'light'
		: cookie.value?.mode
)
const monacoPreBackground = computed(
	() => ({ dark: '', sepia: '#f1e7d0', light: '#1A3B46' })[currentTheme.value] || '#1A3B46'
)

function handleScroll() {
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop
	isScrolled.value = scrollTop > 100
	readingProgress.value = Math.min(
		(scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
		100
	)
}

function updateScreenSize() {
	isMobile.value = typeof window !== 'undefined' ? window.innerWidth < 1024 : false
}

onMounted(async () => {
	updateScreenSize()
	const md = await $fetch('/content/index.md', { lazy: true, responseType: 'text' })
	if (typeof md === 'string') {
		const parsed = await parse(md)
		if (!parsed)
			throw createError({
				statusCode: 404,
				statusMessage: 'Failed to parse markdown content',
				fatal: true,
			})
		parsed.data.title = parsed.data?.title || 'Cẩm Nang webDev'
		useSeoMeta({ title: parsed.data.title, description: parsed.data.description })
		toc.value = parsed.toc
		page.value = parsed
	}
	if (typeof window !== 'undefined') {
		window.addEventListener('monaco-theme-change', handleThemeChange as EventListener)
		window.addEventListener('scroll', handleScroll, { passive: true })
		window.addEventListener('resize', updateScreenSize)
	}
	const observer = new IntersectionObserver(
		(entries) => {
			const visible = entries.filter((e) => e.isIntersecting)
			if (visible.length)
				activeHeading.value = visible.reduce((a, b) =>
					a.intersectionRatio > b.intersectionRatio ? a : b
				).target.id
		},
		{ rootMargin: '0px 0px -70% 0px', threshold: [0.1, 0.25, 0.5, 0.75, 1] }
	)
	nextTick(() =>
		toc.value?.links?.forEach((link) => {
			const el = document.getElementById(link.id)
			if (el) observer.observe(el)
		})
	)
})

onBeforeUnmount(() => {
	if (typeof window !== 'undefined') {
		window.removeEventListener('monaco-theme-change', handleThemeChange as EventListener)
		window.removeEventListener('scroll', handleScroll)
		window.removeEventListener('resize', updateScreenSize)
	}
})

const breadcrumbs = [
	{ title: 'Trang chủ', disabled: false, href: '/' },
	{ title: 'Cẩm nang', disabled: false, href: '/guide' },
	{ title: 'WebDev Guide', disabled: true },
]

function flattenTocLinks(links: any[], depth = 1): any[] {
	return links.flatMap((link) => [
		{ ...link, depth },
		...flattenTocLinks(link.children || [], depth + 1),
	])
}
</script>

<template>
	<div class="docs-page">
		<div class="progress-bar" :style="{ width: `${readingProgress}%` }" />
		<div class="docs-header" :class="{ scrolled: isScrolled }">
			<v-container class="header-container">
				<div class="header-content">
					<v-breadcrumbs :items="breadcrumbs" class="docs-breadcrumbs pa-0 ma-0" density="compact">
						<template #divider>
							<v-icon icon="mdi-chevron-right" size="16" />
						</template>
					</v-breadcrumbs>
					<div class="title-section">
						<div class="title-wrapper">
							<h1 class="docs-title">
								<v-icon class="title-icon" color="primary">mdi-book-open-page-variant</v-icon>
								Cẩm nang WebDev
							</h1>
							<p class="docs-subtitle">
								Hướng dẫn toàn diện về lập trình web với Vue 3 & TypeScript
							</p>
						</div>
						<div class="action-buttons">
							<v-btn
								variant="outlined"
								color="primary"
								prepend-icon="mdi-format-list-bulleted"
								class="toc-toggle-btn"
								@click="toggleToc"
							>
								{{ showToc ? 'Ẩn mục lục' : 'Hiện mục lục' }}
								<v-badge
									v-if="toc?.links?.length"
									:content="toc.links.length"
									color="primary"
									inline
								/>
							</v-btn>
						</div>
					</div>
				</div>
			</v-container>
		</div>

		<div class="docs-layout">
			<div class="docs-container">
				<div class="layout-grid" :class="{ 'toc-visible': showToc, 'toc-hidden': !showToc }">
					<aside class="toc-sidebar" :class="{ 'sidebar-open': showToc }">
						<div class="sidebar-content">
							<div class="sidebar-header">
								<div class="sidebar-title">
									<v-icon size="20" class="mr-2">mdi-format-list-bulleted</v-icon>
									<span>Mục lục</span>
								</div>
								<v-btn
									icon="mdi-close"
									size="small"
									variant="text"
									class="close-btn"
									@click="closeToc"
								/>
							</div>
							<v-divider class="my-3" />
							<div v-if="toc?.links" class="toc-content">
								<div class="toc-list">
									<div
										v-for="link in flattenTocLinks(toc.links)"
										:key="link.id"
										class="toc-item-wrapper"
										:class="{
											'toc-item--active': activeHeading === link.id,
											[`toc-item--depth-${link.depth}`]: true,
										}"
									>
										<a
											:href="`#${link.id}`"
											class="toc-item"
											@click="handleTocClick(link.id, $event)"
										>
											<div class="toc-item-content">
												<div class="toc-indicator" />
												<span class="toc-text">{{ link.text }}</span>
											</div>
										</a>
									</div>
								</div>
							</div>
							<div v-else class="toc-loading">
								<v-skeleton-loader v-for="i in 5" :key="i" type="list-item" />
							</div>
						</div>
					</aside>

					<main class="content-area">
						<div class="content-wrapper">
							<div v-if="!page" class="loading-state">
								<div class="loading-content">
									<v-progress-circular indeterminate color="primary" size="48" width="4" />
									<h3 class="loading-title">Đang tải nội dung...</h3>
									<p class="loading-subtitle">Vui lòng chờ trong giây lát</p>
								</div>
							</div>
							<article v-else class="docs-content">
								<MDCRenderer :body="page.body" :data="page.data" class="markdown-renderer" />
								<footer class="content-footer">
									<v-divider class="mb-6" />
									<div class="footer-actions">
										<div class="feedback-section">
											<h4 class="feedback-title">Bài viết này có hữu ích không?</h4>
											<div class="feedback-buttons">
												<v-btn variant="outlined" color="success" prepend-icon="mdi-thumb-up">
													Có ích
												</v-btn>
												<v-btn variant="outlined" color="error" prepend-icon="mdi-thumb-down">
													Chưa ích
												</v-btn>
											</div>
										</div>
										<div class="share-section">
											<v-btn
												variant="text"
												color="primary"
												prepend-icon="mdi-share-variant"
												@click="shareContent"
											>
												Chia sẻ
											</v-btn>
										</div>
									</div>
								</footer>
							</article>
						</div>
					</main>
					<aside v-if="toc?.links?.length && !isMobile" class="quick-nav">
						<div class="quick-nav-content">
							<h4 class="quick-nav-title">Trên trang này</h4>
							<nav class="quick-nav-list">
								<a
									v-for="link in toc.links.slice(0, 8)"
									:key="link.id"
									:href="`#${link.id}`"
									class="quick-nav-item"
									:class="{ active: activeHeading === link.id }"
									@click="handleQuickNavClick(link.id, $event)"
								>
									{{ link.text }}
								</a>
							</nav>
						</div>
					</aside>
				</div>
			</div>
		</div>

		<div v-if="showToc && isMobile" class="mobile-overlay" @click="showToc = false" />
	</div>
</template>

<style scoped>
:deep(v-container) {
	width: 100%;
	padding: 1px;
}
.docs-page {
	min-height: 100vh;
	background: rgb(var(--v-theme-background));
}
.progress-bar {
	position: fixed;
	top: 0;
	left: 0;
	height: 3px;
	background: linear-gradient(90deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
	z-index: 1001;
	transition: width 0.3s ease;
}
.docs-header {
	position: sticky;
	top: 0;
	z-index: 100;
	background: rgba(var(--v-theme-surface), 0.8);
	backdrop-filter: blur(10px);
	border-bottom: 1px solid rgba(var(--v-theme-outline), 0.1);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.docs-header.scrolled {
	background: rgba(var(--v-theme-surface), 0.95);
	border-bottom-color: rgba(var(--v-theme-outline), 0.2);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.header-content {
	padding: 1px 0;
}
:deep(.docs-breadcrumbs .v-breadcrumbs-item) {
	font-size: 13px;
	opacity: 0.8;
	color: rgb(var(--v-theme-on-surface));
}
.title-section {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
	margin-top: 5px;
}
.docs-title {
	display: flex;
	align-items: center;
	gap: 12px;
	font-size: 2.25rem;
	font-weight: 700;
	color: rgb(var(--v-theme-on-surface));
	background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.title-icon {
	font-size: 2.25rem !important;
}
.docs-subtitle {
	font-size: 1.1rem;
	color: rgb(var(--v-theme-on-surface));
	opacity: 0.8;
	margin: 4px 0 0;
	max-width: 600px;
}
.action-buttons {
	display: flex;
	gap: 12px;
	align-items: center;
}
.docs-layout {
	flex: 0.5;
}
.docs-container {
	width: 100%;
	padding: 0 1px;
}
.layout-grid {
	display: grid;
	gap: 2px;
	min-height: calc(100vh - 180px);
	transition: grid-template-columns 0.3s ease;
}
.layout-grid.toc-visible {
	grid-template-columns: 260px 1fr 220px;
}
.layout-grid.toc-hidden {
	grid-template-columns: 0px 1fr 220px;
}
.toc-sidebar {
	background: rgb(var(--v-theme-surface));
	border: 1px solid rgba(var(--v-theme-outline), 0.1);
	border-radius: 10px;
	overflow: hidden;
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	position: sticky;
	top: 110px;
	height: calc(100vh - 130px);
	max-height: calc(100vh - 130px);
}
.layout-grid.toc-hidden .toc-sidebar {
	opacity: 0;
	visibility: hidden;
	transform: translateX(-260px);
	pointer-events: none;
	width: 0;
	min-width: 0;
	border: none;
}
.layout-grid.toc-visible .toc-sidebar {
	opacity: 1;
	visibility: visible;
	transform: translateX(0);
	pointer-events: auto;
}
.sidebar-content {
	height: 100%;
	display: flex;
	flex-direction: column;
	min-height: 0;
}
.sidebar-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 10px;
	border-bottom: 1px solid rgba(var(--v-theme-outline), 0.1);
	background: rgb(var(--v-theme-surface));
}
.sidebar-title {
	display: flex;
	align-items: center;
	font-weight: 600;
	font-size: 0.95rem;
	color: rgb(var(--v-theme-on-surface));
}
.close-btn {
	display: none;
	opacity: 0.5;
	transition: opacity 0.2s ease;
}
.toc-content {
	flex: 1;
	overflow-y: auto;
	padding: 4px;
	min-height: 0;
}
.toc-content::-webkit-scrollbar {
	width: 5px;
}
.toc-content::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 3px;
}
.toc-content::-webkit-scrollbar-thumb {
	background-color: rgba(var(--v-theme-on-surface), 0.2);
	border-radius: 3px;
	transition: background-color 0.2s ease;
}
.toc-content::-webkit-scrollbar-thumb:hover {
	background-color: rgba(var(--v-theme-on-surface), 0.35);
}
.toc-loading {
	padding: 16px;
	flex-shrink: 0;
}
.toc-list {
	display: flex;
	flex-direction: column;
	gap: 1px;
}
.toc-item-wrapper {
	position: relative;
	transition: all 0.2s ease;
}
.toc-item--depth-1 {
	margin-left: 0;
}
.toc-item--depth-2 {
	margin-left: 14px;
}
.toc-item--depth-3 {
	margin-left: 28px;
}
.toc-item--depth-4 {
	margin-left: 42px;
}
.toc-item {
	display: block;
	text-decoration: none;
	color: rgb(var(--v-theme-on-surface));
	opacity: 0.75;
	border-radius: 7px;
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.toc-item:hover {
	background-color: rgba(var(--v-theme-primary), 0.08);
	color: rgb(var(--v-theme-primary));
	opacity: 1;
}
.toc-item:hover .toc-indicator {
	background-color: rgb(var(--v-theme-primary));
	transform: scaleY(1);
}
.toc-item-content {
	display: flex;
	align-items: center;
	padding: 7px 10px;
}
.toc-indicator {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 3px;
	background-color: transparent;
	border-radius: 0 2px 2px 0;
	transform: scaleY(0);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toc-item--active .toc-indicator {
	background-color: rgb(var(--v-theme-primary));
	transform: scaleY(1);
}
.toc-item--active .toc-item {
	background-color: rgba(var(--v-theme-primary), 0.12);
	color: rgb(var(--v-theme-primary));
	font-weight: 500;
	opacity: 1;
}
.toc-text {
	font-size: 13px;
	line-height: 1.4;
	margin-left: 7px;
	transition: all 0.2s ease;
}
.toc-item--depth-1 .toc-text {
	font-weight: 500;
	font-size: 13.5px;
}
.toc-item--depth-2 .toc-text {
	font-size: 12.5px;
}
.content-area {
	min-width: 0;
}
.content-wrapper {
	max-width: 100%;
}
.loading-state {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 400px;
}
.loading-content {
	text-align: center;
}
.loading-title {
	margin: 16px 0 8px;
	color: rgb(var(--v-theme-on-surface));
}
.loading-subtitle {
	color: rgb(var(--v-theme-on-surface));
	opacity: 0.7;
	margin: 0;
}
.docs-content {
	background: rgb(var(--v-theme-surface));
	border: 1px solid rgba(var(--v-theme-outline), 0.1);
	border-radius: 10px;
	padding: 5px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.markdown-renderer {
	line-height: 1.7;
}
.markdown-renderer :deep(h1, h2, h3, h4, h5, h6) {
	scroll-margin-top: 110px;
	color: rgb(var(--v-theme-on-surface));
}
.markdown-renderer :deep(pre) {
	background-color: v-bind(monacoPreBackground);
	border-radius: 8px;
	padding: 16px;
	overflow-x: auto;
	border: 1px solid rgba(var(--v-theme-outline), 0.1);
}
.markdown-renderer :deep(code) {
	font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
	font-size: 0.875rem;
	line-height: 1.6;
}
.markdown-renderer :deep(pre code) {
	color: #d4d4d4;
	background: transparent;
	padding: 0;
	font-size: 0.875rem;
}
.markdown-renderer :deep(pre .token.comment, .token.prolog, .token.doctype, .token.cdata) {
	color: #6a9955;
	font-style: italic;
}
.markdown-renderer :deep(pre .token.punctuation) {
	color: #d4d4d4;
}
.markdown-renderer
	:deep(
		pre .token.property,
		.token.tag,
		.token.boolean,
		.token.number,
		.token.constant,
		.token.symbol,
		.token.deleted
	) {
	color: #b5cea8;
}
.markdown-renderer
	:deep(
		pre .token.selector,
		.token.attr-name,
		.token.string,
		.token.char,
		.token.builtin,
		.token.inserted
	) {
	color: #ce9178;
}
.markdown-renderer
	:deep(
		pre .token.operator,
		.token.entity,
		.token.url,
		.language-css .token.string,
		.style .token.string
	) {
	color: #d4d4d4;
}
.markdown-renderer :deep(pre .token.atrule, .token.attr-value, .token.keyword) {
	color: #569cd6;
}
.markdown-renderer :deep(pre .token.function, .token.class-name) {
	color: #dcdcaa;
}
.markdown-renderer :deep(pre .token.regex, .token.important, .token.variable) {
	color: #d16969;
}
.markdown-renderer :deep(pre .token.tag .token.tag) {
	color: #569cd6;
}
.markdown-renderer :deep(pre .token.tag .token.attr-name) {
	color: #92c5f7;
}
.markdown-renderer :deep(pre .token.tag .token.attr-value) {
	color: #ce9178;
}
.markdown-renderer :deep(pre .token.tag .token.punctuation) {
	color: #808080;
}
.markdown-renderer
	:deep(pre .token.keyword.keyword-const, .token.keyword.keyword-let, .token.keyword.keyword-var) {
	color: #569cd6;
}
.markdown-renderer :deep(pre .token.keyword.keyword-function) {
	color: #569cd6;
}

.v-theme--light .markdown-renderer :deep(pre) {
	background-color: #f8f8f8;
	color: #383a42;
}
.v-theme--light .markdown-renderer :deep(pre code) {
	color: #383a42;
}
.v-theme--light .markdown-renderer :deep(pre .token.comment) {
	color: #a0a1a7;
}
.v-theme--light .markdown-renderer :deep(pre .token.string) {
	color: #50a14f;
}
.v-theme--light .markdown-renderer :deep(pre .token.keyword) {
	color: #a626a4;
}
.v-theme--light .markdown-renderer :deep(pre .token.function) {
	color: #4078f2;
}
.v-theme--light .markdown-renderer :deep(pre .token.number) {
	color: #986801;
}

.markdown-renderer :deep(p) {
	margin-bottom: 16px;
	color: rgb(var(--v-theme-on-surface));
	opacity: 0.85;
}
.markdown-renderer :deep(a) {
	color: rgb(var(--v-theme-primary));
	text-decoration: none;
}
.markdown-renderer :deep(a:hover) {
	text-decoration: underline;
}

.content-footer {
	margin-top: 40px;
}
.footer-actions {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
}
.feedback-section {
	flex: 1;
}
.feedback-title {
	margin: 0 0 12px;
	font-size: 1rem;
	font-weight: 500;
}
.feedback-buttons {
	display: flex;
	gap: 12px;
}
.quick-nav {
	position: sticky;
	top: 110px;
	height: fit-content;
	max-height: calc(100vh - 130px);
}
.quick-nav-content {
	background: rgb(var(--v-theme-surface));
	border: 1px solid rgba(var(--v-theme-outline), 0.1);
	border-radius: 10px;
	padding: 18px;
	max-height: calc(100vh - 130px);
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
.quick-nav-title {
	font-size: 0.85rem;
	font-weight: 600;
	margin: 0 0 14px;
	color: rgb(var(--v-theme-on-surface));
	text-transform: uppercase;
	letter-spacing: 0.5px;
}
.quick-nav-list {
	display: flex;
	flex-direction: column;
	gap: 6px;
	overflow-y: auto;
	flex: 1;
	min-height: 0;
	padding-right: 4px;
}
.quick-nav-item {
	display: block;
	padding: 7px 10px;
	font-size: 0.85rem;
	color: rgb(var(--v-theme-on-surface));
	opacity: 0.7;
	text-decoration: none;
	border-radius: 6px;
	border-left: 3px solid transparent;
	transition: all 0.2s ease;
}
.quick-nav-item:hover {
	background: rgba(var(--v-theme-primary), 0.08);
	color: rgb(var(--v-theme-primary));
	opacity: 1;
}
.quick-nav-item.active {
	background: rgba(var(--v-theme-primary), 0.12);
	color: rgb(var(--v-theme-primary));
	border-left-color: rgb(var(--v-theme-primary));
	font-weight: 500;
	opacity: 1;
}
@media (min-width: 1440px) {
	.docs-container {
		padding: 0 31px;
	}
	.layout-grid.toc-visible {
		grid-template-columns: 280px 1fr 240px;
		gap: 32px;
	}
	.layout-grid.toc-hidden {
		grid-template-columns: 0px 1fr 240px;
		gap: 32px;
	}
	.docs-content {
		padding: 32px;
	}
	.header-content {
		padding: 24px 0;
	}
}
@media (max-width: 1024px) and (min-width: 768px) {
	.layout-grid,
	.layout-grid.toc-visible,
	.layout-grid.toc-hidden {
		grid-template-columns: 1fr;
		gap: 0;
	}
	.quick-nav {
		display: none;
	}
	.docs-container {
		padding: 0 20px;
	}
	.toc-sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 320px;
		height: 100vh;
		z-index: 200;
		transform: translateX(-100%);
		border-radius: 0;
		border-left: none;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}
	.toc-sidebar.sidebar-open {
		transform: translateX(0);
	}
	.close-btn {
		display: block !important;
	}
}
@media (max-width: 767px) {
	.layout-grid,
	.layout-grid.toc-visible,
	.layout-grid.toc-hidden {
		grid-template-columns: 1fr;
		gap: 0;
	}
	.toc-sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 280px;
		height: 100vh;
		z-index: 200;
		transform: translateX(-100%);
		border-radius: 0;
		border-left: none;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}
	.toc-sidebar.sidebar-open {
		transform: translateX(0);
	}
	.close-btn {
		display: block !important;
	}
	.quick-nav {
		display: none;
	}
	.title-section {
		flex-direction: column;
		align-items: flex-start;
		gap: 14px;
	}
	.docs-title {
		font-size: 1.75rem;
	}
	.action-buttons {
		width: 100%;
		justify-content: flex-start;
	}
	.docs-content {
		padding: 20px 16px;
	}
	.footer-actions {
		flex-direction: column;
		align-items: flex-start;
	}
	.docs-container {
		padding: 0 16px;
	}
	.header-content {
		padding: 16px 0;
	}
}
.mobile-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 199;
}
.toc-toggle-btn {
	transition: all 0.2s ease;
}
.toc-toggle-btn:hover {
	transform: translateY(-1px);
	box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.25);
}
@media (prefers-reduced-motion: reduce) {
	.toc-sidebar,
	.toc-item,
	.quick-nav-item,
	.progress-bar,
	.docs-header {
		transition: none;
	}
}
.toc-item:focus,
.quick-nav-item:focus,
.toc-toggle-btn:focus {
	outline: 2px solid rgb(var(--v-theme-primary));
	outline-offset: 2px;
}
@media print {
	.docs-header,
	.toc-sidebar,
	.quick-nav,
	.progress-bar,
	.action-buttons,
	.content-footer {
		display: none;
	}
	.docs-content {
		border: none;
		box-shadow: none;
		padding: 0;
	}
	.layout-grid {
		grid-template-columns: 1fr;
	}
}
@media (prefers-contrast: high) {
	.toc-sidebar,
	.quick-nav-content,
	.docs-content {
		border-width: 2px;
	}
	.toc-item:hover,
	.quick-nav-item:hover {
		background-color: rgba(var(--v-theme-primary), 0.15);
	}
}
</style>
