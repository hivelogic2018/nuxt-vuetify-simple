<script setup lang="ts">
// import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import type { MDCParserResult, Toc } from '@nuxtjs/mdc'

let page = ref<MDCParserResult | null>(null)
let toc = ref<Toc | undefined>(undefined)
const showToc = ref(false)
const activeHeading = ref('')
const parse = useMarkdownParser()

onMounted(async () => {
  const md = await $fetch('/content/index.md', {
    lazy: true,
    responseType: 'text'
  })

  console.log('Markdown content:', md)

  let parsed: MDCParserResult | null = null
  if (typeof md === 'string') {
    parsed = await parse(md)
    toc.value = parsed.toc
  }

  page.value = parsed

  const observer = new IntersectionObserver(
    entries => {
      const visible = entries.filter(e => e.isIntersecting)
      if (visible.length > 0) {
        const best = visible.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b
        )
        activeHeading.value = best.target.id
      }
    },
    { rootMargin: '0px 0px -80% 0px', threshold: [0.1, 0.5, 1] }
  )

  toc.value?.links.forEach(link => {
    const el = document.getElementById(link.id)
    if (el) observer.observe(el)
  })
})

</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold mb-2">Cẩm nang</h1>

    <div v-if="page" class="page-mdc-content prose dark:prose-invert">
      <v-layout>
        <v-app-bar flat>
          <v-btn icon @click="showToc = !showToc">
            <!-- <v-btn icon @click="showToc = !showToc" class="float-left"></v-btn> -->
            <v-icon>{{ showToc ? 'mdi-close' : 'mdi-format-list-bulleted' }}</v-icon>
          </v-btn>
          <v-toolbar-title>Mục lục</v-toolbar-title>
        </v-app-bar>

        <TocSidebar :toc="toc?.links || []" :isOpen="showToc" :activeId="activeHeading"
          @update:isOpen="showToc = $event" />

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
}

:deep(p) {
  margin: 0 0 16px;

  a {
    color: #4ade80;
  }
}
</style>