<script setup lang="ts">
import ThemeSwitcher from './ThemeSwitcher.vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const githubUrl = 'https://github.com/hivelogic2018/nuxt-vuetify-simple'
</script>

<template>
  <v-app-bar
    flat
    class="px-4"
    color="background"
    elevation="1"
  >
    <!-- Logo / Title -->
    <v-toolbar-title :style="{ color: theme.global.current.value.colors.primary }">
      <NuxtLink
        to="/"
        style="text-decoration: none;"
        :style="{ color: theme.global.current.value.colors.primary }"
      >
      <v-icon left>mdi-home</v-icon>
      My App
      </NuxtLink>
    </v-toolbar-title>

    <v-spacer />

    <!-- Theme Switcher (dropdown) -->
    <ThemeSwitcher class="mr-2" />

    <!-- GitHub Icon -->
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
</template>
