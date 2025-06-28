<template>
  <div>
    <h1 class="text-2xl font-semibold mb-2">Cẩm nang</h1>
    <div v-if="page" class="page-mdc-content prose dark:prose-invert">
      <MDCRenderer v-if="page?.body" :body="page.body" :data="page.data" />
    </div>
  </div>
</template>

<script setup lang="ts">
// import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { MDCParserResult } from '@nuxtjs/mdc'

let page = ref<MDCParserResult | null>(null)
const parse = useMarkdownParser()

onMounted(async () => {
  const md = await $fetch('/content/index.md', {
    lazy: true,
    responseType: 'text'
  })

  console.log('Markdown content:', md)

  page.value = md && typeof md === 'string' ? await parse(md) : null
})

</script>

<style scoped>
h1,
:deep(h1) {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-mdc-content {
  padding: 0 20px 0 20px;
}

:deep(p) {
  margin: 0 0 16px;

  a {
    color: #4ade80;
  }
}
</style>
