<script setup lang="ts">
import type { FormKitSchemaNode } from '@formkit/core'
import { computed } from 'vue'

import type * as types from '~/types/page'
import { handlerRegistry, type HandlerKey } from '~/utils/handlerRegistry'

const props = defineProps<{
	section: types.FormSection
}>()

const formKitSchema = computed<FormKitSchemaNode[]>(() => {
	return props.section.structure.schema
})

async function executeLoadAction(action: types.LoadAction, formData: Record<string, unknown> = {}) {
	let processedData: unknown

	try {
		if (!action?.url) {
			console.warn('Missing action URL')
			return
		}

		let fetchOptions: Record<string, unknown> = {}

		if (action.type === 'graphql') {
			fetchOptions = {
				method: 'POST',
				body: {
					query: action.query,
					variables: formData,
				},
			}
		} else if (action.type === 'xhr') {
			const method = action.method?.toUpperCase() ?? 'GET'
			const methodsWithBody = ['POST', 'PUT', 'PATCH']

			fetchOptions = {
				method,
				body: methodsWithBody.includes(method) ? formData : undefined,
			}
		}

		const response = await $fetch(action.url, fetchOptions)
		processedData = response

		if (action.onSuccess?.successHandler) {
			const handler = handlerRegistry[action.onSuccess.successHandler as HandlerKey]
			if (handler) {
				handler(processedData as any)
			}
		}
	} catch (error) {
		const failureKey = action.onFailure?.failureHandler
		const failureHandler = failureKey && handlerRegistry[failureKey as HandlerKey]
		if (failureHandler) {
			failureHandler(error as Error)
		} else {
			console.error('Action failed:', action.onFailure?.message || 'Unknown error', error)
		}
	}
}

const handleSubmit = async (formData: Record<string, unknown>) => {
	console.log('Form submitted with data:', formData)
	if (props.section.onSubmit?.loadAction) {
		await executeLoadAction(props.section.onSubmit.loadAction, formData)
	}
}
</script>
<template>
	<v-card max-width="fit-content" variant="outlined">
		<v-card-title>{{ section.title }}</v-card-title>
		<v-card-text>
			<FormKit type="form" :value="section.data as Record<string, any>" @submit="handleSubmit">
				<FormKitSchema :schema="formKitSchema" />
			</FormKit>
		</v-card-text>
	</v-card>
</template>
