import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { describe, test, expect } from 'vitest'

describe('Sanity check', async () => {
	await setup({
		// server: true,
		// You can specify test-specific config overrides here if needed
	})

	test('fetches homepage', async () => {
		const html = await $fetch('/number')
		expect(html).toContain('Number:')
	})
})
