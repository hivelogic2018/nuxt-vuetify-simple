import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

await setup({
  // You can specify test-specific config overrides here if needed
})

describe('Basic Nuxt test', () => {
  it('renders homepage', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Welcome to Nuxt')
    expect(html).toContain('nuxt-route-announcer')
  })
})