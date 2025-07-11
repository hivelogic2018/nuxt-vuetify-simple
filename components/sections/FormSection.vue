<script setup lang="ts">
import { computed } from 'vue'
import { usePageDataStore } from '~/stores/page-data.store'
import { handlerRegistry, type HandlerKey } from '~/utils/handlerRegistry'
import type { FormKitSchemaNode } from '@formkit/core'
import type * as types from '~/types/page'

const props = defineProps<{
	section: types.FormSection
}>()

const formKitSchema = computed<FormKitSchemaNode[]>(() => {
	return props.section.structure.schema
})

async function executeLoadAction(
	action: types.LoadAction,
	formData: Record<string, unknown> = {}
) {
	
	
	const store = usePageDataStore()
	if (!action || action.type !== 'xhr') return

	try {
		const { data: response, error } = await useFetch(action.url, {
	  method: action.method?.toUpperCase() as
		| 'GET'
		| 'POST'
		| 'PUT'
		| 'DELETE'
		| 'PATCH'
		| 'HEAD'
		| 'OPTIONS'
		| 'CONNECT'
		| 'TRACE'
		| undefined,
	  body:
		action.method?.toUpperCase() === 'POST' ? formData : undefined,
    })
		
		if (error.value) {
			if (action.onFailure?.failureHandler) {
				const handler =
					handlerRegistry[action.onFailure.failureHandler as HandlerKey]
				if (handler) {
					handler(error.value)
				}
			}
      return;
    }

		let processedData = response.value
		if (action.onSuccess?.successHandler) {
			const handler =
				handlerRegistry[action.onSuccess.successHandler as HandlerKey]
			if (handler) {
				//Unknown type because 
				//A REST API can return data in any shape (an object, an array, a string, etc.).
				//A GraphQL API typically returns a very specific shape, like { data: { ... } }.
				//The handlerRegistry.ts will handle the different shapes of data
				processedData = (handler as (data: unknown) => unknown)(processedData)
			}
		}

		const targetKey =
			action.onSuccess?.targetDataStore
		if (targetKey) {
			store.setData(targetKey, processedData)
		}
	} catch (error) {
		console.error('Action failed:', action.onFailure?.message || 'Unknown error', error);
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
			<FormKit
				type="form"
				:value="section.data as Record<string, any>"
				@submit="handleSubmit"
			>
				<FormKitSchema :schema="formKitSchema" />
			</FormKit>
		</v-card-text>
	</v-card>
</template>
