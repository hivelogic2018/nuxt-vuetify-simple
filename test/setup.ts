// test/setup.ts
import { beforeAll } from 'vitest'
import { setup } from '@nuxt/test-utils'
// import { TextEncoder, TextDecoder } from 'util'
import { TextEncoder, TextDecoder } from 'node:util'

beforeAll(async () => {
	await setup({
		// Optional Nuxt overrides (e.g. test-specific config)
	})
})

if (typeof globalThis.TextEncoder === 'undefined') {
	globalThis.TextEncoder = TextEncoder as typeof globalThis.TextEncoder
}
if (typeof globalThis.TextDecoder === 'undefined') {
	globalThis.TextDecoder = TextDecoder as typeof globalThis.TextDecoder
}
