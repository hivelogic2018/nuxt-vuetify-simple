// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  // Automatically import components
  colorMode: {
    classSuffix: '',
    // Default theme preference
    fallback: 'light' // Fallback theme if no preference is set
    ,
    preference: 'system'
  },
  compatibilityDate: '2025-05-15',
  components: true,
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Theme used if `html.dark`
            darkMode: 'dracula-soft',
            // Default theme (same as single string)
            default: 'github-light',
            // or 'github-dark' or 'material-theme-ocean'
            // Theme used if `html.sepia`
            sepia: 'monokai'
          }
        },
        remarkPlugins: {
          // Add the remark-toc plugin to generate a table of contents
          // for markdown files. The toc will be generated based on the
          // headings in the markdown content.
          'remark-toc': {
            // Maximum depth of headings to include in the TOC
            heading: 'Layout' // Custom heading for the TOC
            ,
            // Use tight list style for the TOC
            maxDepth: 5,
            tight: true
          }
        },
        toc: {
          depth: 5 // include h3 headings,
        }
      }
    }
  },
  css: [
    '~/public/assets/css/main.scss',
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils/module',
    '@nuxtjs/mdc'
  ],
  // devServer: {
  //   https: {
  //     key: './server.key',
  //     cert: './server.crt'
  //   }
  // }
  plugins: ['~/plugins/vuetify.ts'],
  ssr: true,
  vite: {
    optimizeDeps: {
      include: ['monaco-editor'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'monaco-editor': ['monaco-editor'],
          },
        },
      },
    },
  },
})