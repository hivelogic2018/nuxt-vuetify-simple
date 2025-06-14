<script lang="ts" setup>
import { useTheme } from 'vuetify'
import get from 'lodash/get'

const num = useState<number>('num', () => Math.floor(Math.random() * 100));
const refreshNum = () => {
  num.value = Math.floor(Math.random() * 100);
};

const theme = useTheme()
const neutral = computed(() => get(theme, 'global.current.value.colors.neutral', '#6B7280'))

</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Tailwindcss v4.1 Hello world!
    </h1>
    <v-container>
      <p>Number: <span> {{ num }}</span></p>
      <v-btn @click="refreshNum">Refresh</v-btn>
      <v-btn color="primary" text="Vuetify Button"></v-btn>
      <client-only>
        <MonacoEditor />
      </client-only>

      <div class="top-30">
        <p class="text-left" :style="{ color: neutral, padding: '1rem' }">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
    </v-container>
  </div>
</template>