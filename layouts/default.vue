<!-- layouts/default.vue -->
<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer />
      <ThemeSwitcher />
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'
</script>
