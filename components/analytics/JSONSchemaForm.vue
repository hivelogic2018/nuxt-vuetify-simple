<template>
	<div>
		<h2 v-if="title" class="text-lg font-semibold mb-4">{{ title }}</h2>

		<FormKit
			type="form"
			:actions="true"
			:submit-label="submitLabel"
			@submit="onSubmit"
		>
			<FormKitSchema :schema="fields" :data="data" />
		</FormKit>
	</div>
</template>

<script setup lang="ts">
//import { computed } from 'vue'
import type { FormKitSchemaNode } from '@formkit/core'

import { validationFns, validationMessages } from '~/helper/validations'
import { enrichFormKitSchema } from '~/utils/formkitRegistry'
//const field1s = computed(() => enrichFormKitSchema(props.schema.fields))

//console.log('JSONSchemaForm fields:', field1s.value)
//import { onInputFn } from '~/helper/functions'

const props = defineProps<{
	schema: {
		title?: string
		submitLabel?: string
		fields: FormKitSchemaNode[]
	}
	onSubmit: (formData: Record<string, unknown>) => void
}>()

const title = props.schema.title
const submitLabel = props.schema.submitLabel ?? 'Submit'

//const fields = [
//	{
//		$formkit: 'text',
//		name: 'username',
//		label: 'Username',
//		placeholder: 'Enter username',
//		validationVisibility: 'live',
//		validation: 'checkUsername',
//		validationRules: '$validationRules',
//		validationMessages: validationMessages,
//	},
//]

const fields = computed(() => enrichFormKitSchema(props.schema.fields))
//console.log('Fields', fields)
const data = {
	validationRules: validationFns,
}
</script>
