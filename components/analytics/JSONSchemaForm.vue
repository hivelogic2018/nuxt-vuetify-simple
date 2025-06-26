<template>
  <div>
    <h2 v-if="title" class="text-lg font-semibold mb-4">{{ title }}</h2>

    <FormKit type="form" :actions="true" :submit-label="submitLabel" @submit="onSubmit">
      <FormKitSchema :schema="fields" />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FormKitSchemaNode } from '@formkit/core'

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
const fields = computed(() => props.schema.fields)
</script>
