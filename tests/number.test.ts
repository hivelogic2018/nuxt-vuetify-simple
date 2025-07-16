import { setup } from '@nuxt/test-utils/e2e'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect } from 'vitest'

import AppNumber from '../pages/number/index.vue'

await setup({
	server: true,
	// You can specify test-specific config overrides here if needed
})

// video: https://www.youtube.com/watch?v=yGzwk9xi9gU
describe('AppNumber', () => {
	it('can mount and render', async () => {
		const component = await mountSuspended(AppNumber)
		expect(component.html()).toContain('Number')
	})
	it('returns the state', async () => {
		mockNuxtImport('useState', () => {
			return () => 3
		})
		const component = await mountSuspended(AppNumber)
		expect(component.text()).toContain('Refresh')
	})
})

// describe('Basic Nuxt test', () => {
//   it('renders homepage', async () => {
//     const html = await $fetch('/')
//     expect(html).toContain('Welcome to Nuxt')
//     expect(html).toContain('aria-live') // Checks NuxtRouteAnnouncer
//     expect(html).toContain('id="nuxt-route-announcer"')
//   })
// })
