import { remark } from 'remark'
import remarkToc from 'remark-toc'
import { read, write } from 'to-vfile'
import { VFile } from 'vfile'

async function main() {
	try {
		const inputPath = './public/content/index.md'

		const processed = await remark()
			// .use(remarkToc)
			.process(await read(inputPath))

		// Write .html output (just renamed, still Markdown content)
		const htmlOutput = new VFile({
			path: inputPath.slice(0, -3) + '.html',
			value: processed.value,
		})
		await write(htmlOutput)
		console.log(`Generated ${htmlOutput.path}`)

		const processedWithToc = await remark()
			.use(remarkToc)
			.process(await read(inputPath))

		// Write .processed.md output (Markdown with TOC)
		const mdOutput = new VFile({
			path: inputPath.replace(/\.md$/, '.withTOC.md'),
			value: processedWithToc.value,
		})
		await write(mdOutput)
		console.log(`Generated ${mdOutput.path}`)
	} catch (error) {
		console.error('Error processing markdown:', error)
		process.exit(1)
	}
}

main()
