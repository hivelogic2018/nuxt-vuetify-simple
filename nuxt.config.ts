// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['vuetify']
  },
  compatibilityDate: '2024-11-01',
  components: true,
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css'],
  devtools: {
    enabled: true
  },
  plugins: ['~/plugins/vuetify.js'],
  ssr: true,
  typescript: {
    strict: true
  },
  vite: {
    optimizeDeps: {
      // Exclude vuetify since it has an issue with vite dev - TypeError: makeVExpansionPanelTextProps is not a function - the makeVExpansionPanelTextProps is used before it is defined
      exclude: ['vuetify']
    }
  }
})
