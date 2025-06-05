<script setup lang="ts">
import { useTheme } from 'vuetify'
import { ref, watch, onMounted } from 'vue'
import { useCookie } from '#app'

const theme = useTheme()

const themeModes = ['light', 'dark', 'sepia']
const currentTheme = ref('light')
const savedTheme = useCookie('theme-mode')
const primaryColorCookie = useCookie('primary-color')
const neutralColorCookie = useCookie('neutral-color')

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

const setColor = (type: string, value: string) => {
  const current = theme.global.name.value
  const currentColors = theme.themes.value[current]?.colors || {}

  theme.themes.value[current] = {
    ...theme.themes.value[current],
    colors: {
      ...currentColors,
      [type]: value
    }
  }
}

watch(currentTheme, (val) => {
  theme.global.name.value = val
  savedTheme.value = val
}, { immediate: true })

onMounted(() => {
  // Initial load from cookies
  if (savedTheme.value) currentTheme.value = savedTheme.value
  if (primaryColorCookie.value) setColor('primary', primaryColorCookie.value)
  if (neutralColorCookie.value) setColor('neutral', neutralColorCookie.value)
})
</script>

<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-palette</v-icon>
      </v-btn>
    </template>

    <v-card min-width="280">
      <v-card-text>
        <h4 class="text-subtitle-1 mb-2">Primary</h4>
        <v-row dense>
          <v-col v-for="color in primaryColors" :key="color.name" cols="6">
            <v-btn block variant="outlined" size="small" :color="color.value" class="justify-start"
              @click="setColor('primary', color.value)">
              <v-avatar size="10" :color="color.value" class="me-2"></v-avatar>
              {{ color.name }}
              <v-icon size="14" v-if="theme.global.current.value.colors.primary === color.value"
                class="ms-auto">mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <h4 class="text-subtitle-1 mt-4 mb-2">Neutral</h4>
        <v-row dense>
          <v-col v-for="color in neutralColors" :key="color.name" cols="6">
            <v-btn block variant="outlined" size="small" :color="color.value" class="justify-start"
              @click="setColor('neutral', color.value)">
              <v-avatar size="10" :color="color.value" class="me-2"></v-avatar>
              {{ color.name }}
              <v-icon size="14" v-if="theme.global.current.value.colors.neutral === color.value"
                class="ms-auto">mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <h4 class="text-subtitle-1 mt-4 mb-2">Theme</h4>
        <v-btn-toggle v-model="currentTheme" divided variant="outlined" density="compact">
          <v-btn value="light">
            <v-icon start size="18">mdi-white-balance-sunny</v-icon>
            Light
          </v-btn>
          <v-btn value="dark">
            <v-icon start size="18">mdi-weather-night</v-icon>
            Dark
          </v-btn>
          <v-btn value="sepia">
            <v-icon start size="18">mdi-monitor</v-icon>
            Sepia
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-menu>
</template>