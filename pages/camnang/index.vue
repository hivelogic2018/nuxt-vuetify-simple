<script setup lang="ts">
import { ref } from 'vue'
import MarkdownRenderer from '~/components/MarkdownRenderer.vue'

// Import raw markdown (Vite supports ?raw)
import camnangMd from '~/content/index.md?raw'

const showToc = ref(false)
</script>

<template>
  <h1>Cẩm nang: Giới thiệu, hướng dẫn học về lập trình web ứng dụng với Vue3 và Typescript</h1>
  <v-btn @click="showToc = !showToc" color="primary">
    {{ showToc ? 'Ẩn Mục lục' : 'Hiện Mục lục' }}
  </v-btn>
  <MarkdownRenderer :source="camnangMd" :showToc="showToc" />
</template>