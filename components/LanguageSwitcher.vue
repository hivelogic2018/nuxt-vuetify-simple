<template>
	<v-menu>
		<template #activator="{ props }">
			<v-btn icon v-bind="props">
				<v-icon>mdi-translate</v-icon>
			</v-btn>
		</template>
		<v-card min-width="200" class="py-2">
			<v-list density="comfortable">
				<v-list-item v-for="(lang, code) in languages" :key="code" class="px-4" @click="setLanguage(code)">
					<v-list-item-title class="text-subtitle-1">
						{{ lang }}
						<v-icon v-if="locale === code" size="20" class="ml-auto">mdi-check</v-icon>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-card>
	</v-menu>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'

const { locale, languages, setLanguage } = useLanguage()
</script>
