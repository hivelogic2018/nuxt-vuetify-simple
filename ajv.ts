// import Ajv from 'ajv/dist/2020.js'// Use default import for Ajv
// import Ajv from 'ajv/dist/ajv.js' // Use ESM version of Ajv
import { default as addFormats } from 'ajv-formats' // Correctly import ajv-formats
import { default as addErrors } from 'ajv-errors' // Correctly import ajv-errors

import { defineNuxtPlugin } from "nuxt/app";

// Factory function to create and configure an Ajv instance
export async function createAjvInstance() {
  const { default: Ajv } = await import('https://cdn.jsdelivr.net/npm/ajv@8.17.1/dist/2020.js')
  const ajv = new Ajv({ allErrors: true, strict: false, messages: true }) // Enable messages for ajv-errors
  addFormats(ajv) // Apply formats to the Ajv instance
  addErrors(ajv) // Apply ajv-errors to the Ajv instance
  return ajv
}

export default defineNuxtPlugin(() => {
  // No need to provide the Ajv instance globally
})

// export default defineNuxtPlugin((nuxtApp) => {
//   const ajv = new Ajv({ allErrors: true, strict: false, messages: true }) // Enable messages for ajv-errors
//   addFormats(ajv) // Apply formats to the Ajv instance
//   addErrors(ajv) // Apply ajv-errors to the Ajv instance
//   nuxtApp.provide('ajv', ajv)
// })