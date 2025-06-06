<!-- layouts/default.vue -->
<script lang="ts" setup>
import TheNav from '~/components/TheNav.vue'
</script>

<template>
  <v-app>
    <TheNav />
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>
