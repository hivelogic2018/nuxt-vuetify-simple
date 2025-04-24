// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '@schemas': './src/schemas', // Custom alias for forms directory
    '@components': './src/components', // Example alias for components
    '@utils': './src/utils', // Example alias for utilities
  },
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              targets: isServer ? { node: 'current' } : { browsers: ['defaults'] }
            }
          ]
        ];
      }
    },
    transpile: [
      '@jsonforms/core', '@jsonforms/vue', '@jsonforms/vue-vanilla',
      'vuetify'
    ]
  },
  compatibilityDate: '2024-11-01',
  components: true,
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css'],
  devtools: {
    enabled: true
  },
  plugins: ['~/plugins/vuetify.ts'],
  ssr: true,
  typescript: {
    strict: true
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['dayjs', 'maska'], // Exclude "maska" from the bundle
      },
    },
    optimizeDeps: {
      // Exclude vuetify since it has an issue with vite dev - TypeError: makeVExpansionPanelTextProps is not a function - the makeVExpansionPanelTextProps is used before it is defined
      exclude: ['vuetify']
    }
  }
})
