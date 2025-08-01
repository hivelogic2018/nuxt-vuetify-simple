import type { FormKitNode } from '@formkit/core'

const nameRule = (node: FormKitNode) => {
	if (typeof node.value === 'string' && node.value.length > 0) {
		const regex = /^[a-zA-Z -]+$/
		return regex.test(node.value)
	}
	return true
}

const maxCharsRule = (node: FormKitNode) => {
	if (typeof node.value === 'string') {
		return node.value.length <= 10
	}
	return true
}

export type ValidationRule = {
	rule: (node: FormKitNode) => boolean
	message: string
}

export const validations: Record<string, ValidationRule> = {
	nameRule: {
		rule: nameRule,
		message: 'Please enter a valid name (letters and spaces only).',
	},
	maxCharsRule: {
		rule: maxCharsRule,
		message: 'Please enter 10 characters or fewer.',
	},
}
