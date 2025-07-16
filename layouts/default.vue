<!-- layouts/default.vue -->
<template>
	<v-app>
		<TheNav />
		<v-main>
			<v-container fluid class="mx-2 mx-sm-4 mx-md-8">
				<NuxtPage />
			</v-container>
		</v-main>
		<AppFooter />
	</v-app>
</template>

<script lang="ts" setup>
import AppFooter from '~/components/AppFooter.vue'
import TheNav from '~/components/TheNav.vue'
</script>
