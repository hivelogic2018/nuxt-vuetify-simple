import type { FormKitSchemaNode } from '@formkit/core'

export type JSONSchemaFormType = {
	title?: string
	submitLabel?: string
	fields: FormKitSchemaNode[]
}
