<script setup lang="ts">
defineProps<{
	toc: Array<{ id: string; text: string; depth: number }>
	isOpen: boolean
	activeId: string
}>()
const emit = defineEmits(['update:isOpen'])
</script>

<template>
	<v-navigation-drawer
		:model-value="isOpen"
		app
		temporary
		right
		width="300"
		@update:model-value="emit('update:isOpen', $event)"
	>
		<v-list>
			<v-list-item-title class="text-h6 text-center">Table of Contents</v-list-item-title>
			<v-divider class="my-2" />
			<v-list-item
				v-for="item in toc"
				:key="item.id"
				:style="{ paddingLeft: `${item.depth * 12}px` }"
			>
				<NuxtLink
					:to="`#${item.id}`"
					:class="{ 'text-primary font-weight-bold': activeId === item.id }"
				>
					{{ item.text }}
				</NuxtLink>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<style scoped>
html {
	scroll-behavior: smooth;
}
</style>
