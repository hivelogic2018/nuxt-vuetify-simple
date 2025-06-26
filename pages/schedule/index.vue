<!-- pages/schedule/index.vue -->
<template>
  <v-container fluid>
    <v-card class="pa-4" max-width="500" width="100%">
      <AppointmentForm :schema="schema" :on-submit="handleSubmit" />
      <div v-if="submitted">
        <h2 class="text-xl text-green-500">Submission successful!</h2>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppointmentForm from '~/components/schedule/AppointmentForm.vue'
import { appointmentFormSchema } from '@/schemas/AppointmentFormSchema'
import type { AppointmentFormData } from '@/types/schedule'

const submitted = ref(false)
const schema = appointmentFormSchema

const handleSubmit = (formData: AppointmentFormData) => {
  console.log('Form Submitted:', formData)
  submitted.value = true
}
</script>
