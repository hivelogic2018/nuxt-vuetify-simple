<!-- layouts/default.vue -->
<script lang="ts" setup>
import AppFooter from '~/components/AppFooter.vue'
import TheNav from '~/components/TheNav.vue'
</script>

<template>
	<v-app>
		<TheNav />
		<v-main>
			<v-container fluid>
				<NuxtPage />
			</v-container>
		</v-main>
		<AppFooter />
	</v-app>
</template>
