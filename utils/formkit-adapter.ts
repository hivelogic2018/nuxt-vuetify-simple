import type { FormKitSchemaNode } from '@formkit/core'

export function translateSchemaToFormKit(jsonSchema: any, uiSchema: any = {}): FormKitSchemaNode[] {
  const properties = jsonSchema.properties || {}
  
  return Object.keys(properties).map(key => {
    const prop = properties[key]
    const uiOptions = uiSchema[key] || {}
    
    let formkitType = 'text'
    if (prop.type === 'string' && prop.enum) {
      formkitType = 'select'
    }
    if (uiOptions['ui:widget'] === 'textarea') {
      formkitType = 'textarea'
    }
     if (uiOptions['ui:widget'] === 'password') {
      formkitType = 'password'
    }

    const node: FormKitSchemaNode = {
      $formkit: formkitType,
      name: key,
      label: prop.title,
      placeholder: uiOptions['ui:placeholder'],
      help: uiOptions['ui:help'],
      validation: jsonSchema.required?.includes(key) ? 'required' : undefined,
      options: prop.enum,
    }
    return node
  })
}