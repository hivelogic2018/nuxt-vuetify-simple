<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from 'vuetify'
import get from 'lodash/get'

const showToc = ref(false)
const { data: page } = await useAsyncData(() => queryCollection('content').path('/').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value?.title || 'Cẩm Nang webDev',
  description: page.value?.description
})

const theme = useTheme()
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

const cookie = useCookie('theme-mode', {
  default: () => ({
    mode: 'system',
    primaryColor: '#3B82F6',
    neutralColor: '#6B7280'
  })
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
    case 'dark': return ''
    case 'sepia': return '#f1e7d0'
    default: return '#1A3B46'
  }
})

console.log('Current Monaco Theme:', monacoTheme.value, monacoPreBackground.value)
</script>

<template>
  <h1>Cẩm nang: Giới thiệu, hướng dẫn học về lập trình web ứng dụng với Vue3 và Typescript</h1>
  <v-btn @click="showToc = !showToc" color="primary">
    {{ showToc ? 'Ẩn Mục lục' : 'Hiện Mục lục' }}
  </v-btn>

   <div class="top-30 markdown" :style="{ color: neutral, padding: '1rem' }">
     <ContentRenderer v-if="page" :value="page" />
    <div v-else>CamNang page not found</div>
   </div>
</template>

<style scoped>
.markdown :deep(pre) {
  background-color: v-bind(monacoPreBackground); /* bg-muted fallback */
}
</style>