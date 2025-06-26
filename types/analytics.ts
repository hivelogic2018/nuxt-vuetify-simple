import type { FormKitSchemaNode } from '@formkit/core'

export interface JSONSchemaFormType {
  title?: string
  submitLabel?: string
  fields: FormKitSchemaNode[]
}
