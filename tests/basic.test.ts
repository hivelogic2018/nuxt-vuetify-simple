import { setup } from '@nuxt/test-utils'
import { describe, it, expect, beforeAll } from 'vitest'

describe('Basic Test', () => {
	beforeAll(async () => {
		await setup({
			rootDir: __dirname,
			// other options if needed
		})
	})

	it('should work', () => {
		expect(true).toBe(true)
	})
})

describe('Math', () => {
	it('adds numbers', () => {
		expect(1 + 1).toBe(2)
	})
})
