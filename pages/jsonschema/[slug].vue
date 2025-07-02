<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import DynamicPage from '../../components/DynamicPage.vue'

const route = useRoute()
const schema = ref<any>(null)
const slug = ref(route.params.slug as string)

watchEffect(async () => {
	try {
		// Dynamically import the schema based on the URL slug
		const pageSchema = await import(`../../schemas/service-debugger.json`)
		schema.value = pageSchema.default
	} catch (e) {
		console.error(`Failed to load schema for: ${slug.value}`, e)
	}
})
</script>

<template>
	<v-container fluid>
		<DynamicPage v-if="schema" :schema="schema" />
		<div v-else>
			<p>Loading page...</p>
		</div>
	</v-container>
</template>
