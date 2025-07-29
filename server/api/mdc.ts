import { readFile } from 'node:fs/promises'

import { useMarkdownParser } from '~/composables/useMarkdownParser'

export default defineEventHandler(async (event) => {
	const theme = getQuery(event).theme?.toString() || 'material-theme-palenight'

	const content = await readFile('./public/content/index.md', 'utf-8')

	const parser = await useMarkdownParser(theme)
	const parsed = await parser(content)

	return parsed
})
