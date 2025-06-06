<script setup lang="ts">
import { useTheme } from 'vuetify'
import { ref, onMounted } from 'vue'
import { useCookie } from '#app'
import { Icon } from '@iconify/vue'

const theme = useTheme()

const currentTheme = ref<'light' | 'dark' | 'sepia' | 'system'>('system')

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

const cookie = useCookie('theme-mode', {
  default: () => ({
    mode: 'system',
    primaryColor: primaryColors[0].value,
    neutralColor: neutralColors[0].value
  })
}) as Ref<{
  mode: 'light' | 'dark' | 'sepia' | 'system'
  primaryColor: string
  neutralColor: string
}>


// Apply theme from cookie or defaults
const applyTheme = () => {
  const { mode, primaryColor, neutralColor } = cookie.value

  currentTheme.value = ['light', 'dark', 'sepia', 'system'].includes(mode)
  ? mode as typeof currentTheme.value
  : 'system'


  if (mode === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.global.name.value = isDark ? 'dark' : 'light'
  } else {
    theme.global.name.value = mode
  }

  setColor('primary', primaryColor)
  setColor('neutral', neutralColor)
}

const setColor = (type: 'primary' | 'neutral', value: string) => {
  const name = theme.global.name.value
  theme.themes.value[name] = {
    ...theme.themes.value[name],
    colors: {
      ...theme.themes.value[name]?.colors,
      [type]: value
    }
  }

  cookie.value = {
    ...cookie.value,
    [`${type}Color`]: value
  }
}

const setThemeMode = (mode: typeof currentTheme.value) => {
  currentTheme.value = mode

  cookie.value = {
    mode,
    primaryColor: cookie.value.primaryColor,
    neutralColor: cookie.value.neutralColor
  }

  if (mode === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.global.name.value = isDark ? 'dark' : 'light'
  } else {
    theme.global.name.value = mode
  }

  setColor('primary', cookie.value.primaryColor)
  setColor('neutral', cookie.value.neutralColor)
}

onMounted(applyTheme)
</script>

<template>
  <v-menu offset-y>
    <template #activator="{ props }">
      <v-btn v-bind="props" icon variant="text">
        <Icon icon="lucide:swatch-book" width="24" height="24" />
      </v-btn>
    </template>

    <v-card min-width="280" class="pa-3">
      <!-- Primary Colors -->
      <h4 class="text-subtitle-1 mt-4 mb-2">Primary</h4>
      <v-row dense>
        <v-col
          v-for="color in primaryColors"
          :key="color.name"
          cols="6"
        >
          <v-btn
            block
            variant="outlined"
            @click="setColor('primary', color.value)"
            class="justify-start"
          >
            <v-avatar size="16" :color="color.value" class="me-2" />
            {{ color.name }}
            <v-icon size="14" v-if="cookie.primaryColor === color.value" class="ms-auto">mdi-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <h4 class="text-subtitle-1 mt-4 mb-2">Neutral</h4>
      <v-row dense>
        <v-col
          v-for="color in neutralColors"
          :key="color.name"
          cols="6"
        >
          <v-btn
            block
            variant="outlined"
            @click="setColor('neutral', color.value)"
            class="justify-start"
          >
            <v-avatar size="16" :color="color.value" class="me-2" />
            {{ color.name }}
            <v-icon size="14" v-if="cookie.neutralColor === color.value" class="ms-auto">mdi-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <h4 class="text-subtitle-1 mt-4 mb-2">Theme</h4>
      <v-btn-toggle
        v-model="currentTheme"
        divided
        mandatory
        class="w-100"
        @update:model-value="setThemeMode"
      >

        <v-btn value="light">
          <v-icon start size="18">mdi-white-balance-sunny</v-icon>
          Light
        </v-btn>
        <v-btn value="dark">
          <v-icon start size="18">mdi-weather-night</v-icon>
          Dark
        </v-btn>
        <v-btn value="sepia">
          <v-icon start size="18">mdi-book-open-page-variant</v-icon>
          Sepia
        </v-btn>
        <v-btn value="system">
          <v-icon start size="18">mdi-monitor</v-icon>
          System
        </v-btn>
      </v-btn-toggle>
    </v-card>
  </v-menu>
</template>
