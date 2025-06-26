<!--<script setup>
import { reactive } from 'vue'

const schema = [
  {
    $el: 'h1',
    bind: '$someAttributes',
    children: 'Click me!',
  },
]

const data = reactive({
  someAttributes: {
    class: 'red',
    onClick: () => {
      if (data.someAttributes.class === 'red') {
        data.someAttributes.class = 'blue'
      } else {
        data.someAttributes.class = 'red'
      }
    },
    'data-fruit': 'I like fruit',
  },
})
</script>

<template>
  <FormKitSchema :schema="schema" :data="data" />
</template>

<style>
.red {
  color: red;
}
.blue {
  color: blue;
}
</style>-->
<script setup lang="ts">
import { reactive, computed } from 'vue'
import type { FormKitSchemaNode } from '@formkit/core'

const props = defineProps<{
  date: string
  time: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const state = reactive({
  confirmed: props.modelValue,
  checkboxAttrs: {
    class: 'confirm-box',
    onClick: () => {
      state.confirmed = !state.confirmed
      emit('update:modelValue', state.confirmed)
    }
  }
})

const schema = computed<FormKitSchemaNode[]>(() => [
  {
    $el: 'div',
    attrs: {
      class: 'confirmation-wrapper'
    },
    children: [
      {
        $el: 'p',
        children: `Appointment scheduled for ${props.date} at ${props.time}`
      },
      {
        $el: 'div',
        bind: '$checkboxAttrs',
        children: [
          {
            $el: 'input',
            attrs: {
              type: 'checkbox',
              checked: state.confirmed,
              readonly: true,
              style: 'margin-right: 8px;'
            }
          },
          {
            $el: 'span',
            children: 'Confirmed'
          }
        ]
      }
    ]
  }
])
</script>

<template>
  <FormKitSchema :schema="schema" />
</template>

<style scoped>
.confirmation-wrapper {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  margin: 10px 0;
}
.confirm-box {
  cursor: pointer;
  margin-top: 8px;
  display: flex;
  align-items: center;
}
</style>
