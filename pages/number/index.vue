<script lang="ts" setup>
import { useTheme } from 'vuetify';

const num = useState<number>('num', () => Math.floor(Math.random() * 100));
const refreshNum = () => {
  num.value = Math.floor(Math.random() * 100);
};

const theme = useTheme()
const neutral = computed(() => theme.global.current.value.colors.neutral)
</script>

<template>
  <div>
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