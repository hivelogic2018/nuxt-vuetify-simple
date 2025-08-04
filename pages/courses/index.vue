<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)
const viewMode = ref<'grid' | 'list'>('grid')

const otherCourses = [
	{ id: 1, title: 'Intro to Web Development' },
	{ id: 2, title: 'Advanced JavaScript' },
	{ id: 3, title: 'UI/UX Design Basics' },
]

const youtubePlaylists = [
	{ id: 'hdI2bqOjy3c', title: 'JavaScript Crash Course For Beginners' },
	{ id: 'JVqPDKFMhZc', title: 'ES6 ECMAScript là gì - Bài 01 Tìm hiểu ECMAScript 6' },
	{ id: 'VeNfHj6MhgA&t', title: 'Vue.js Crash Course' },
	{
		id: '5cQLTdaRunE&list=PL28Ap55o84DTu8qRGXpvyBcKYUGfVFxy9',
		title:
			'Cách setup máy để học - side-by-side Setup to code and learn webApp programing/development',
	},
	{ id: 'tK2P2LUSK6k', title: 'Javascript - part 1' },
	{ id: 'bKdS-76M0oM&t=1s', title: 'dạy Vue bài 1' },
]
</script>

<template>
	<v-container class="py-6">
		<v-tabs v-model="activeTab" class="mb-4">
			<v-tab>Classes</v-tab>
			<v-tab>YouTube Playlists</v-tab>
		</v-tabs>

		<v-window v-model="activeTab">
			<v-window-item :value="0">
				<v-row>
					<v-col cols="12" md="8">
						<h2 class="text-h6 mb-2">Class Schedule</h2>
						<v-sheet height="400" class="d-flex align-center justify-center bg-grey-lighten-4">
							<span>Consultation, Counseling, Technical support, Career guidance</span>
						</v-sheet>
					</v-col>

					<v-col cols="12" md="4">
						<h2 class="text-h6 mb-2">Other Available Courses</h2>
						<v-list dense>
							<v-list-item v-for="course in otherCourses" :key="course.id">
								<v-list-item-title>{{ course.title }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-col>
				</v-row>
			</v-window-item>

			<v-window-item :value="1">
				<div class="d-flex justify-end mb-2">
					<v-btn-toggle v-model="viewMode" mandatory>
						<v-btn value="grid">Grid</v-btn>
						<v-btn value="list">List</v-btn>
					</v-btn-toggle>
				</div>

				<v-row v-if="viewMode === 'grid'" dense>
					<v-col v-for="video in youtubePlaylists" :key="video.id" cols="12" sm="6" md="4">
						<v-card>
							<iframe
								width="100%"
								height="200"
								:src="`https://www.youtube.com/embed/${video.id}`"
								frameborder="0"
								allowfullscreen
							></iframe>
							<v-card-title>{{ video.title }}</v-card-title>
						</v-card>
					</v-col>
				</v-row>

				<v-list v-else>
					<v-list-item v-for="video in youtubePlaylists" :key="video.id">
						<v-list-item-content>
							<v-list-item-title>{{ video.title }}</v-list-item-title>
							<iframe
								width="100%"
								height="180"
								:src="`https://www.youtube.com/embed/${video.id}`"
								frameborder="0"
								allowfullscreen
							></iframe>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-window-item>
		</v-window>
	</v-container>
</template>

<style scoped>
iframe {
	border-radius: 8px;
}
</style>
