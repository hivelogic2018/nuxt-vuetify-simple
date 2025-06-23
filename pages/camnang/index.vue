<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCookie } from '#app'
import camnangMd from '~/content/index.md?raw'
import { useRoute } from 'vue-router'

const route = useRoute()
const tocCookie = useCookie('showToc', { default: () => 'false' })
const showToc = ref(tocCookie.value === 'true')

watch(showToc, (val) => {
  tocCookie.value = val ? 'true' : 'false'
})

const isCamnangPage = computed(() => route.name === 'camnang' || route.path === '/camnang')

</script>

<template>
  <b>Cẩm nang: Giới thiệu, hướng dẫn học về lập trình web ứng dụng với Vue3 và Typescript</b>
  <br>
  <v-btn @click="showToc = !showToc" color="primary">
    {{ showToc ? 'Ẩn Mục lục' : 'Hiện Mục lục' }}
  </v-btn>
  <div id="mdContent" v-show="isCamnangPage">
    <MarkdownRenderer  :source="camnangMd" :showToc="showToc" />
  </div>
</template>