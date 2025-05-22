// test/setup.ts
import { beforeAll } from 'vitest'
import { setup } from '@nuxt/test-utils'

beforeAll(async () => {
  await setup({
    // Optional Nuxt overrides (e.g. test-specific config)
  })
})
