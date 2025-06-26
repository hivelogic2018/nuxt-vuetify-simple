<script setup lang="ts">
import { ref } from 'vue'
import type { JSONSchemaFormType } from '~/types/analytics'
import rawSchema from '../../schemas/analyticsForm.json'
import JSONSchemaForm from '../../components/analytics/JSONSchemaForm.vue'

const submitted = ref(false)
const schema = rawSchema as JSONSchemaFormType

const handleSubmit = (formData: Record<string, unknown>): void => {
  console.log('Submitted form data:', formData)
  submitted.value = true
}
</script>

<template>
  <v-container fluid>
    <v-card class="pa-4" max-width="500" width="100%">
      <JSONSchemaForm :schema="schema" :on-submit="handleSubmit" />
      <div v-if="submitted">
        <h2 class="text-green-600 mt-4">Form submitted successfully!</h2>
      </div>
    </v-card>
  </v-container>
</template>
