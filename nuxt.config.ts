// https://nuxt.com/docs/api/configuration/nuxt-config

import { lodashModules } from './lodash-modules';
import { lodashFpModules } from './lodash-fp-modules';

export default defineNuxtConfig({
  alias: {
    '@schemas': './src/schemas', // Custom alias for forms directory
    '@components': './src/components', // Example alias for components
    '@utils': './src/utils', // Example alias for utilities
  },
  build: {
    transpile: [
      'vuetify',
      '@jsonforms/core', '@jsonforms/vue', '@jsonforms/vue-vanilla',
    ]
  },
  compatibilityDate: '2024-11-01',
  components: true,
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css', '@jsonforms/vue-vanilla/vanilla.css'],
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
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [
          ...lodashModules,
          ...lodashFpModules,
          'ajv', 'ajv-formats', 'ajv-errors',
        ]
      },
    },
    optimizeDeps: {
      include: [
        ...lodashModules,
        ...lodashFpModules,
        'ajv',
        'ajv/dist/2019.js',
        'ajv-formats',
        'ajv-formats/dist/formats.js',
        'ajv-i18n',
        'ajv-errors',
        'debug'
      ]
    },
    ssr: {
      noExternal: ['ajv', 'ajv-formats', 'ajv-errors', 'lodash'], // ⬅️ critical for SSR mode
    }
  }
})
