<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import type { PageSchema } from '@/types/page'

defineProps<{
	schema: PageSchema
}>()

const sectionComponents = {
	FORM: defineAsyncComponent(() => import('@/components/sections/FormSection.vue')),
	// TABLE
	// LIST
}

const getComponentForSection = (type: string) => {
	return sectionComponents[type as keyof typeof sectionComponents] || null
}
</script>

<template>
	<div>
		<section v-for="(section, index) in schema.sections" :key="index" class="mb-8">
			<component :is="getComponentForSection(section.type)" :section="section" />
		</section>
	</div>
</template>
