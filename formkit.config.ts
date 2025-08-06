import type { FormKitNode } from '@formkit/core'
import { genesisIcons } from '@formkit/icons'
import { defineFormKitConfig } from '@formkit/vue'

import { rootClasses } from './formkit.theme'

import { validations } from '~/utils/validations'

const rules: Record<string, (node: FormKitNode) => boolean> = {}
const messages: Record<string, string> = {}

for (const key in validations) {
	rules[key] = validations[key].rule
	messages[key] = validations[key].message
}

export default defineFormKitConfig({
	rules,
	locales: {
		en: {
			validation: {
				...messages,
				required: 'This field is required.',
			},
			ui: {},
		},
	},
	config: {
		rootClasses,
		validationVisibility: 'dirty',
	},
	icons: {
		...genesisIcons,
	},
})
