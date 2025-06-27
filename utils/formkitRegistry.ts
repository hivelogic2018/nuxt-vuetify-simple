//const modules = import.meta.glob('../helpers/formkitFunctions/*.ts', { eager: true })

//type FnMap = Record<string, (...args: unknown[]) => unknown>

//const functionRegistry: FnMap = {}

//for (const path in modules) {
//  const mod = modules[path] as Record<string, (...args: unknown[]) => unknown>
//  for (const [name, fn] of Object.entries(mod)) {
//    functionRegistry[name] = fn
//  }
//}

//export default functionRegistry
import { validationFns } from '~/helper/validations'
import { onInputFn } from '~/helper/functions'
import type { FormKitSchemaNode } from '@formkit/core'

export function enrichFormKitSchema(fields: FormKitSchemaNode[]): FormKitSchemaNode[] {
  return fields.map(field => {
    if (typeof field === 'object' && field !== null) {
      const newField = { ...field }

      // Bind validation function
      if ('validationFn' in newField && typeof newField.validationFn === 'string' &&
  newField.validationFn in validationFns) {
        const fnName = newField.validationFn as keyof typeof validationFns
        newField.validation = validationFns[fnName]
      }

      // Bind input handler
      if ('onInputFn' in newField && typeof newField.onInputFn === 'string' &&
  newField.onInputFn in onInputFn) {
        const fnName = newField.onInputFn as keyof typeof onInputFn
        newField.props = {
          ...(newField.props || {}),
          onInput: (e: InputEvent | string) => {
            const value = typeof e === 'string' ? e : (e.target as HTMLInputElement)?.value
            onInputFn[fnName](value)
          }
        }
      }

      return newField
    }
    return field
  })
}
