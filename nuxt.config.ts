// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  // Automatically import components
  compatibilityDate: '2025-05-15',
  components: true,
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            // Theme used if `html.dark`
            darkMode: 'material-theme',
            // Default theme (same as single string)
            default: 'material-theme-lighter',
            // or 'github-dark' or 'material-theme-ocean'
            // Theme used if `html.sepia`
            sepia: 'material-theme-palenight'
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
    '~/public/assets/css/tailwind.css',
    '~/public/assets/css/main.scss', // keep your custom styles
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils/module',
    '@nuxtjs/mdc',
    '@nuxtjs/tailwindcss',
  ],
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix', // URLs like / not /en
    langDir: 'locales',
    lazy: true,
    restructureDir: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      fallbackLocale: 'en',
    }
  },
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
  runtimeConfig: {
    public: {
      githubUrl: process.env.NUXT_PUBLIC_GITHUB_URL
    }
  },
})