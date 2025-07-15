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
    }
		else if (action.type === 'xhr') {
      fetchOptions = {
        method: action.method ?? 'GET',
        body: action.method === 'POST' ? formData : undefined,
      }
    }

    const response = await $fetch(action.url, fetchOptions)
    processedData = response

    if (action.onSuccess?.successHandler) {
      const handler = handlerRegistry[action.onSuccess.successHandler as HandlerKey]
      if (handler) {
        processedData = (handler as (data: unknown) => unknown)(processedData)
      }
    }

    if (action.onSuccess?.targetDataStore) {
      store.setData(action.onSuccess.targetDataStore, processedData)
    }
  } catch (error) {
    const failureKey = action.onFailure?.failureHandler
    const failureHandler = failureKey && handlerRegistry[failureKey as HandlerKey]
    if (failureHandler) {
      (failureHandler as (err: unknown) => void)(error)
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
