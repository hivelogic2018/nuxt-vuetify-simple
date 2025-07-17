<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
	videoId: string
	embedUrl?: string
	thumbnailUrl?: string
	alt?: string
	width?: number | string
	height?: number | string
	title?: string
}>()

const showVideo = ref(false)

const resolvedEmbedUrl = computed(
	() => props.embedUrl || `https://www.youtube.com/embed/${props.videoId}`
)
const resolvedThumbnailUrl = computed(
	() => props.thumbnailUrl || `https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`
)
const resolvedAlt = computed(() => props.alt || 'Video thumbnail')
const resolvedTitle = computed(() => props.title || 'Embedded Video')
const resolvedWidth = computed(() => props.width || 560)
const resolvedHeight = computed(() => props.height || 315)
</script>

<template>
	<div>
		<a
			v-if="!showVideo"
			:href="resolvedEmbedUrl"
			target="_blank"
			rel="noopener"
			@click.prevent="showVideo = true"
		>
			<img
				:src="resolvedThumbnailUrl"
				:alt="resolvedAlt"
				style="max-width: 100%; cursor: pointer"
			/>
			<div style="text-align: left">▶ Xem video</div>
		</a>
		<iframe
			v-else
			:width="resolvedWidth"
			:height="resolvedHeight"
			:src="resolvedEmbedUrl"
			:title="resolvedTitle"
			allowfullscreen
			style="max-width: 100%"
		></iframe>
	</div>
</template>
