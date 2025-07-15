<template>
	<div>
		<v-select v-model="item" :items="items" label="item" />
	</div>
</template>

<script setup>
import { ref } from 'vue'

const item = ref('system')

const items = ['system', 'light', 'dark', 'sepia']
</script>
