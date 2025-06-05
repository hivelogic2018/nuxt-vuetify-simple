<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-palette</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text class="theme-switcher">
        <h4 class="text-subtitle-2 mb-2">Primary</h4>
        <v-btn
          v-for="color in primaryColors"
          :key="color.name"
          :color="color.value"
          size="small"
          class="ma-1"
          @click="setColor('primary', color.value)"
        >
          {{ color.name }}
        </v-btn>

        <h4 class="text-subtitle-2 mt-4 mb-2">Neutral</h4>
        <v-btn
          v-for="color in neutralColors"
          :key="color.name"
          :style="{ backgroundColor: color.value, color: '#fff' }"
          size="small"
          class="ma-1"
          @click="setColor('neutral', color.value)"
        >
          {{ color.name }}
        </v-btn>

        <h4 class="text-subtitle-2 mt-4 mb-2">Theme</h4>
        <v-btn-toggle v-model="currentTheme" mandatory>
          <v-btn value="light">Light</v-btn>
          <v-btn value="dark">Dark</v-btn>
          <v-btn value="sepia">Sepia</v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
const currentTheme = ref(theme.global.name.value)

watch(currentTheme, val => theme.global.name.value = val)

const primaryColors = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Emerald', value: '#10B981' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Amber', value: '#F59E0B' },
]

const neutralColors = [
  { name: 'Gray', value: '#6B7280' },
  { name: 'Zinc', value: '#71717A' },
  { name: 'Slate', value: '#64748B' },
]

function setColor(type: 'primary' | 'neutral', value: string) {
  const currentTheme = theme.global.name.value
  const themeColors = theme.themes.value[currentTheme]?.colors

  if (themeColors) {
    theme.themes.value[currentTheme] = {
      ...theme.themes.value[currentTheme],
      colors: {
        ...themeColors,
        [type]: value
      }
    }
  }
}

</script>

<style scoped>
.theme-switcher {
  min-width: 280px;
}
</style>
