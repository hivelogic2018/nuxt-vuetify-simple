<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTOC from 'markdown-it-table-of-contents'

const props = defineProps<{
  source: string
  showToc?: boolean
}>()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItAnchor)
  .use(markdownItTOC, {
    includeLevel: [1, 2, 3],
    containerClass: 'toc',
    markerPattern: /^\[toc\]/im,
  })

const rendered = computed(() => {
  let src = props.source
  if (props.showToc) {
    // Insert [toc] marker at the top if not present
    if (!/^\[toc\]/im.test(src)) src = '[toc]\n' + src
  } else {
    // Remove [toc] marker if present
    src = src.replace(/^\[toc\]\s*/im, '')
  }
  return md.render(src)
})
</script>

<template>
  <div class="markdown-body" v-html="rendered"></div>
</template>

<style>
@import 'github-markdown-css/github-markdown.css';

/* Confine all styles to #mdContent */
#mdContent .markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
}
#mdContent .toc {
  padding: 1em;
  border-radius: 6px;
  margin-bottom: 1em;
}
/* Add any other markdown-body or toc-related styles here, always prefixing with #mdContent */
</style>
