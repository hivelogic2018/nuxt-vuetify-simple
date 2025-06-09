<script setup lang="ts">
import { ref } from 'vue'
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
</script>

<template>
  <h1>Cẩm nang: Giới thiệu, hướng dẫn học về lập trình web ứng dụng với Vue3 và Typescript</h1>
  <v-btn @click="showToc = !showToc" color="primary">
    {{ showToc ? 'Ẩn Mục lục' : 'Hiện Mục lục' }}
  </v-btn>

   <div class="top-30" :style="{ color: neutral, padding: '1rem' }">
     <ContentRenderer v-if="page" :value="page" />
    <div v-else>CamNang page not found</div>
   </div>
</template>
