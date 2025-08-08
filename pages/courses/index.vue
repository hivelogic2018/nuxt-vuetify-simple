<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref(0)
const viewMode = ref<'grid' | 'list'>('grid')

const otherCourses = [
	{ id: 1, title: 'Intro to Web Development' },
	{ id: 2, title: 'Advanced JavaScript' },
	{ id: 3, title: 'UI/UX Design Basics' },
]

const classScheduleItems = ['Consultation', 'Counseling', 'Technical support', 'Career guidance']

const youtubePlaylists = [
	{ id: 'hdI2bqOjy3c', title: 'JavaScript Crash Course For Beginners' },
	{ id: 'JVqPDKFMhZc', title: 'ES6 ECMAScript là gì - Bài 01 Tìm hiểu ECMAScript 6' },
	{ id: 'VeNfHj6MhgA&t', title: 'Vue.js Crash Course' },
	{ id: '5cQLTdaRunE&list=PL28Ap55o84DTu8qRGXpvyBcKYUGfVFxy9', title: 'Cách setup máy để học ' },
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
				<!-- Class Schedule -->
				<h2 class="text-h6 mb-2">Class Schedule</h2>
				<v-sheet height="200" class="d-flex flex-column align-left justify-center mb-10">
					<span v-for="(item, index) in classScheduleItems" :key="index">
						{{ item }}
					</span>
				</v-sheet>

				<!-- Other Available Courses -->
				<h2 class="text-h6 mb-2">Other Available Courses</h2>
				<v-sheet height="200" class="d-flex flex-column align-left justify-center mb-10">
					<span v-for="course in otherCourses" :key="course.id">
						{{ course.title }}
					</span>

					<v-divider class="my-5" />
					<p class="text-caption text-grey-darken-1">More courses will be added soon.</p>
				</v-sheet>
			</v-window-item>
			<v-window-item :value="1">
				<div class="d-flex justify-end mb-2">
					<v-btn-toggle v-model="viewMode" mandatory>
						<v-btn value="grid">Grid View</v-btn>
						<v-btn value="list">List View</v-btn>
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
