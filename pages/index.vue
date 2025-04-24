<template>
  <v-container class="py-4">
    <v-card class="pa-4" outlined>
      <v-card-title>User Profile</v-card-title>

      <v-card-text>
        <v-form ref="formRef">
          <v-jsf
            v-model="formData"
            :schema="schema"
            :ui-schema="uiSchema"
            :options="options"
            @error="onError"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="secondary" variant="outlined" @click="onReset">Reset</v-btn>
        <v-btn color="primary" @click="onSubmit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import VJsf from '@koumoul/vjsf'
// import '@koumoul/vjsf/src/styles/vjsf.css'
// import { VForm } from 'vuetify/components'

// // import { useVjsf } from '@koumoul/vjsf'

// Form model
const initialFormData = { // Define the initial state of the form
  firstName: '',
  age: null,
  email: '',
  subscribe: false
}

const formData = ref({ ...initialFormData })

// JSON Schema
const schema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'First Name',
      description: 'Your given name.'
    },
    age: {
      type: 'integer',
      title: 'Age',
      minimum: 0
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'Email'
    },
    subscribe: {
      type: 'boolean',
      title: 'Subscribe to newsletter'
    }
  },
  required: ['firstName', 'email']
}

// UI Schema
const uiSchema = {
  firstName: { 'ui:autofocus': true },
  age: { 'ui:widget': 'updown' },
  email: { 'ui:empty-value': '' },
  subscribe: { 'ui:widget': 'checkbox' }
}

// VJSF options
const options = {
  validateOnSubmit: true,
  validateOnChange: false,
  outlined: true,
  dense: true,
  showDetails: true,
  hideRequiredAsterisk: false,
  disableReadonly: false,
  hideReadOnly: false,
  markdown: true,
  autoFocus: true
}

// Handlers
function onSubmit() {
  console.log('Submitted form:', formData.value)
  alert(`Submitted!\n\n${JSON.stringify(formData.value, null, 2)}`)
}

function onError(errors) {
  console.warn('Validation errors:', errors)
}

function onReset() {
  formData.value = { ...initialFormData } // Reset formData to its initial state
}

</script>
