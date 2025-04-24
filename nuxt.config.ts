
// Nuxt 3 configuration file
export default defineNuxtConfig({
  css: ['@jsonforms/vue-vanilla/vanilla.css'],

  typescript: {
    strict: true,
  },

  build: {
    transpile: ['@jsonforms/core', '@jsonforms/vue', '@jsonforms/vue-vanilla', 'lodash']
  },

  compatibilityDate: '2025-04-19',
  vite: {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
        include: ['lodash', 'lodash/cloneDeep.js', 'ajv', 'ajv-formats', 'ajv-errors']
      },
      optimizeDeps: {
        include: [
          'ajv',
          'ajv/dist/2019.js',
          'ajv-formats',
          'ajv-formats/dist/formats.js',
          'ajv-i18n',
          'ajv-errors',
          'lodash',
          'lodash/cloneDeep.js',
          'lodash-es',
          'lodash-es/cloneDeep.js',
          'lodash-es/cloneDeepWith.js',
          'lodash-es/clone.js',
          'lodash-es/cloneWith.js',
          'lodash-es/merge.js',
          'lodash-es/mergeWith.js',
          'debug'
        ]
      },
    },
    ssr: {
      noExternal: ['ajv', 'ajv-formats', 'ajv-errors', 'lodash'], // ⬅️ critical for SSR mode
    }
  }
})