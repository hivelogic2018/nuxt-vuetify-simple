<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

defineProps<{
	schema: Record<string, any>
}>()

// Map section types from the JSON to your Vue components
const sectionComponents = {
	FORM: defineAsyncComponent(
		() => import('@/components/sections/FormSection.vue')
	),
	// TABLE: defineAsyncComponent(() => import('./sections/TableSection.vue')),
	// LIST: defineAsyncComponent(() => import('./sections/ListSection.vue')),
}

const getComponentForSection = (type: string) => {
	return sectionComponents[type as keyof typeof sectionComponents] || null
}
</script>

<template>
	<div>
		<section
			v-for="(section, index) in schema.sections"
			:key="index"
			class="mb-8"
		>
			<component
				:is="getComponentForSection(section.type)"
				:section="section"
			/>
		</section>
	</div>
</template>
