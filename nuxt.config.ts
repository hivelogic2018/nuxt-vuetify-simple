// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  content: {
    build: {
      markdown: {
        toc: {
          depth: 5, // include h3 headings
        },
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            darkMode: 'dracula-soft', // or 'github-dark' or 'material-theme-ocean'
            // Theme used if `html.sepia`
            sepia: 'monokai'
          },
        },
        remarkPlugins: {
          // Add the remark-toc plugin to generate a table of contents
          // for markdown files. The toc will be generated based on the
          // headings in the markdown content.
          'remark-toc': {
            tight: true, // Use tight list style for the TOC
            maxDepth: 5, // Maximum depth of headings to include in the TOC
            heading: 'Table of Contents' // Custom heading for the TOC
          }
        }
      },
    },
  },
  css: [
    '~/public/assets/css/main.scss'
  ],
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils/module'
  ],
  ssr: true,
  // devServer: {
  //   https: {
  //     key: './server.key',
  //     cert: './server.crt'
  //   }
  // }
})