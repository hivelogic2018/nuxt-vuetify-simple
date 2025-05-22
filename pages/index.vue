<template>
  <h1>JSON Forms Vue 3</h1>
  <div class="myform">
    <json-forms
      :data="formData"
      :renderers="renderers"
      :schema="schema"
      :uischema="uischema"
      :id="id"
      @change="onChange"
    />
    <ControlWrapper
      :id="formData.id || 'default-id'"
      description="Unique identifier for the form element"
      errors=""
    />
  </div>
</template>

<script setup lang="ts">
import { provide, markRaw, ref } from 'vue'
import { JsonForms, type JsonFormsChangeEvent } from '@jsonforms/vue'
import {
  defaultStyles,
  mergeStyles,
  vanillaRenderers
} from '@jsonforms/vue-vanilla'

// Define props
defineProps({
  id: {
    type: String,
    default: '',
  },
})

// Custom styles override
const myStyles = mergeStyles(defaultStyles, {
  control: { label: 'mylabel' }
})

// Provide custom styles to all child components
provide('styles', myStyles)

// Schema and UI schema
import schema from '@/src/schemas/schema.json'
import uischema from '@/src/schemas/uischema.json'

// Initial form data
const formData = ref({
  id: "unique-id-123", // Ensure id is initialized
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3
})

// JSON Forms renderers
const renderers = markRaw([...vanillaRenderers]) // Can add custom renderers here

// Change handler
function onChange(event: JsonFormsChangeEvent) {
  formData.value = event.data
}
</script>

<style scoped>
.myform {
  text-align: center;
  margin: 60px 120px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
