<template>
  <v-app-bar flat color="background" elevation="1" class="px-4">
    <!-- Mobile menu toggle -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-sm-none" />

    <!-- App title -->
    <v-toolbar-title>
      <NuxtLink
        to="/"
        style="text-decoration: none;"
        :style="{ color: theme.global.current.value.colors.primary }"
      >
        <v-icon start size="24">mdi-home-circle-outline</v-icon>
        My App
      </NuxtLink>
    </v-toolbar-title>

    <!-- Desktop navigation links -->
    <div class="d-none d-sm-flex align-center gap-2">
      <NuxtLink
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.to"
        class="text-subtitle-1 font-weight-bold d-inline-flex align-center"
        style="text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 1.2rem;"
        :style="{
          color: $route.path === item.to
            ? theme.global.current.value.colors.primary
            : theme.global.current.value.colors.neutral
        }"
      >
        <v-icon size="20" class="mr-1">{{ item.icon }}</v-icon>
        {{ item.label }}
      </NuxtLink>
    </div>

    <v-spacer />

    <!-- Theme switcher + GitHub icon -->
    <ThemeSwitcher class="mr-2" />
    <v-btn
      icon
      :href="githubUrl"
      target="_blank"
      rel="noopener noreferrer"
      variant="text"
    >
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Mobile drawer -->
  <v-navigation-drawer v-model="drawer" temporary class="d-sm-none">
    <v-list>
      <v-list-item
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.to"
        link
        @click="drawer = false"
      >
        <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const theme = useTheme()
const $route = useRoute()
const drawer = ref(false)

const githubUrl = 'https://github.com/hivelogic2018/nuxt-vuetify-simple'

const navItems = [
  { label: 'Store', to: '/store', icon: 'mdi-store' },
  { label: 'Chat', to: '/chat', icon: 'mdi-chat' },
  { label: 'Schedule', to: '/schedule', icon: 'mdi-calendar-clock' },
  { label: 'Guide', to: '/guide', icon: 'mdi-compass-outline' },
]
</script>
