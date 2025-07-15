<script lang="ts" setup>
const props = defineProps<{ modelValue: string }>()
defineEmits(['update:modelValue'])
</script>

<template>
	<input
		:value="props.modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	>
</template>