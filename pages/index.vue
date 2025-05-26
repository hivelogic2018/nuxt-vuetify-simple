<script lang="ts" setup>
  const message = ref('Nuxt')
  const hello = () => sayHello(message.value)
</script>

<template>
  <v-container>
    <v-form @submit.prevent="hello">
      <MyInput v-model="message" />
      <v-btn type="submit">Say Hello</v-btn>
    </v-form>
  </v-container>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
