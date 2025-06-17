<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCookie } from '#app'
import MarkdownRenderer from '~/components/MarkdownRenderer.vue'
import camnangMd from '~/content/index.md?raw'

const tocCookie = useCookie('showToc', { default: () => 'false' })
const showToc = ref(tocCookie.value === 'true')

watch(showToc, (val) => {
  tocCookie.value = val ? 'true' : 'false'
})
</script>

<template>
  <h1>Cẩm nang: Giới thiệu, hướng dẫn học về lập trình web ứng dụng với Vue3 và Typescript</h1>
  <v-btn @click="showToc = !showToc" color="primary">
    {{ showToc ? 'Ẩn Mục lục' : 'Hiện Mục lục' }}
  </v-btn>
  <MarkdownRenderer :source="camnangMd" :showToc="showToc" />
</template>