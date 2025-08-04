// composables/useMarkdownParser.ts
// Import package exports
import { createMarkdownParser, rehypeHighlight, createShikiHighlighter } from '@nuxtjs/mdc/runtime'
// Import desired Shiki themes and languages
import HtmlLang from '@shikijs/langs/html'
import MdcLang from '@shikijs/langs/mdc'
import ScssLang from '@shikijs/langs/scss'
import TsLang from '@shikijs/langs/typescript'
import VueLang from '@shikijs/langs/vue'
import YamlLang from '@shikijs/langs/yaml'
import MaterialThemePalenight from '@shikijs/themes/material-theme-palenight'

export default function useMarkdownParser() {
	let parser: Awaited<ReturnType<typeof createMarkdownParser>>

	const parse = async (markdown: string) => {
		if (!parser) {
			parser = await createMarkdownParser({
				rehype: {
					plugins: {
						highlight: {
							instance: rehypeHighlight,
							options: {
								// Pass in your desired theme(s)
								theme: 'material-theme-palenight',
								// Create the Shiki highlighter
								highlighter: createShikiHighlighter({
									bundledThemes: {
										'material-theme-palenight': MaterialThemePalenight,
									},
									// Configure the bundled languages
									bundledLangs: {
										html: HtmlLang,
										mdc: MdcLang,
										vue: VueLang,
										yml: YamlLang,
										scss: ScssLang,
										ts: TsLang,
										typescript: TsLang,
										javascript: TsLang, // Use TypeScript for JavaScript highlighting
										js: TsLang, // Use TypeScript for JavaScript highlighting
									},
								}),
							},
						},
					},
				},
				toc: {
					depth: 3,
					searchDepth: 3,
				},
			})
		}
		return parser(markdown)
	}

	return parse
}
