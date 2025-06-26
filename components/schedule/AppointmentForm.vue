<template>
  <FormKit type="form" :actions="false" @submit="onSubmit">
    <FormKitSchema :schema="schema" :library="customLibrary" />
  </FormKit>
</template>

<script setup lang="ts">
import type { FormKitSchemaNode } from '@formkit/core'
import type { AppointmentFormData } from '@/types/schedule'
import MyCustomInput from '~/components/schedule/ConfirmNote.vue'


defineProps<{
  schema: FormKitSchemaNode[]
  onSubmit: (formData: AppointmentFormData) => void
}>()

const customLibrary = markRaw({
  MyCustomInput,
})
</script>
