
import { validationFns } from '~/helper/validations'
import { onInputFn } from '~/helper/functions'
import type { FormKitSchemaNode } from '@formkit/core'

const defaultValidationMessages = {
  checkUsername: 'Username must be longer than 3 characters',
  isEmail: 'Enter a valid email address',
  // Add more default messages here
}

export function enrichFormKitSchema(
	fields: FormKitSchemaNode[]
): FormKitSchemaNode[] {
	return fields.map((field) => {
		if (typeof field === 'object' && field !== null) {
			const newField = { ...field }
      //console.log('Enriching field:', newField)
      //console.log("result", 'validationFn' in newField &&
			//	typeof newField.validationFn === 'string' &&
			//	newField.validationFn in validationFns)

			// Bind validation function
			if (
				'validationFn' in newField &&
				typeof newField.validationFn === 'string' &&
				newField.validationFn in validationFns
			) {
				const fnName = newField.validationFn as keyof typeof validationFns
				newField.validation = validationFns[fnName]
			}

			// Bind input handler
			if (
				'onInputFn' in newField &&
				typeof newField.onInputFn === 'string' &&
				newField.onInputFn in onInputFn
			) {
				const fnName = newField.onInputFn as keyof typeof onInputFn
				newField.props = {
					...(newField.props || {}),
					onInput: (e: InputEvent | string) => {
						const value =
							typeof e === 'string' ? e : (e.target as HTMLInputElement)?.value
						onInputFn[fnName](value)
					},
				}
			}
    console.log('Field', newField)

			return newField
		}
    console.log('Field', field)
		return field
	})
}
