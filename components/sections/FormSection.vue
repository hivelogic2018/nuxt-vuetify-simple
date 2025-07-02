<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { usePageDataStore } from '~/stores/page-data.store'
import { handlerRegistry, type HandlerKey } from '~/utils/handlerRegistry'
import { translateSchemaToFormKit } from '~/utils/formkit-adapter'
import type { FormKitSchemaNode } from '@formkit/core'

const props = defineProps<{
	section: Record<string, any>
}>()

onMounted(() => {
	if (props.section.loadAction) {
		executeLoadAction(props.section.loadAction)
	}
})

const formKitSchema = computed<FormKitSchemaNode[]>(() => {
	const store = usePageDataStore()
	const structure = props.section.structure || {}

	if (structure.schema === 'timerMapSchema') {
		const mapperFn = handlerRegistry[structure.schema as HandlerKey]
		if (typeof mapperFn === 'function') {
			const generatedSchema = mapperFn(store.data)
			return translateSchemaToFormKit(generatedSchema, structure.uiSchema)
		}
	}
	return translateSchemaToFormKit(structure.schema, structure.uiSchema)
})

async function executeLoadAction(
	action: any,
	formData: Record<string, any> = {}
) {
	const store = usePageDataStore()
	if (!action || action.type !== 'xhr') return

	try {
		const { data: response } = await useFetch(action.url, {
			method: action.method as 'GET' | 'POST',
			body:
				action.method === 'POST' ? { ...action.data, ...formData } : undefined,
		})

		let processedData = response.value
		if (action.onSuccess?.successHandler) {
			const handler =
				handlerRegistry[action.onSuccess.successHandler as HandlerKey]
			if (handler) processedData = handler(processedData)
		}

		const targetKey =
			action.onSuccess?.targetDataField || action.onSuccess?.targetDataStore
		if (targetKey) {
			// It's now safe to call store methods here.
			store.setData(targetKey, processedData)
		}
	} catch (error) {
		console.error('Action failed:', error)
	}
}

const handleSubmit = async (formData: Record<string, unknown>) => {
	if (props.section.onSubmit?.loadAction) {
		await executeLoadAction(props.section.onSubmit.loadAction, formData)
	}
}
</script>
<template>
	<v-card class="pa-4">
		<v-card-title>{{ section.title }}</v-card-title>
		<v-card-text>
			<FormKit
				type="form"
				:actions="section.classNames !== 'ui-no-submit'"
				@submit="handleSubmit"
			>
				<FormKitSchema :schema="formKitSchema" />
			</FormKit>
		</v-card-text>
	</v-card>
</template>
