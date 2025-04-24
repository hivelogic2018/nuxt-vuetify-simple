import vuetify from 'vite-plugin-vuetify';
import { commonjsDeps } from '@koumoul/vjsf/utils/build.js'

export default defineNuxtConfig({
  ssr: true,

  typescript: {
    strict: true,
  },

  css: ['vuetify/styles'],

  build: {
    transpile: [
      'vuetify',
      '@koumoul/vjsf',
    ],
  },
  buildModules: [
		'@nuxtjs/vuetify',
	],

  vite: {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    optimizeDeps: {
      include: commonjsDeps,
    },
    ssr: {
      noExternal: ['ajv', 'ajv-formats', 'ajv-errors'], // ⬅️ critical for SSR mode
    },
    plugins: [vuetify()],
  },

  compatibilityDate: '2025-04-17',
});