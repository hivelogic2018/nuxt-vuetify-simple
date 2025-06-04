import { remark } from 'remark'
import remarkToc from 'remark-toc'
import { read, write } from 'to-vfile'

async function main() {
  try {
    const file = await remark()
      .use(remarkToc)
      .process(await read('./content/index.md'))

    file.path = './content/index.md.html'
    await write(file)
    console.log('Generated ./content/index.md.html')
  } catch (error) {
    console.error('Error processing markdown:', error)
    process.exit(1)
  }
}

main()