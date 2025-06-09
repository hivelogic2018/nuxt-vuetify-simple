<template>
  <v-footer
    app
    :color="footerColor"
    class="py-6 px-8"
    :class="{ 'text-white': isDarkOrSepia, 'text-black': !isDarkOrSepia }"
  >
    <v-container>
      <v-expansion-panels v-if="isMobile" flat>
        <v-expansion-panel>
          <v-expansion-panel-title>{{ $t('footer.sections.navigation') }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list dense nav>
              <v-list-item v-for="item in navLinks" :key="item.to" :to="item.to" link>
                <v-list-item-title>{{ $t(item.label) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>{{ $t('footer.sections.more') }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list dense nav>
              <v-list-item :to="'/biography'" link>
                <v-list-item-title>{{ $t('nav.biography') }}</v-list-item-title>
              </v-list-item>
              <v-list-item href="https://github.com/hivelogic2018/nuxt-vuetify-simple" target="_blank">
                <v-list-item-title>GitHub</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-row v-else>
        <v-col cols="12" sm="6">
          <h4 class="text-h6 mb-2">My App</h4>
          <p class="text-caption">
            {{ $t('footer.description') }}
          </p>
        </v-col>
        <v-col cols="6" sm="3">
          <h6 class="text-subtitle-1 mb-2">{{ $t('footer.sections.navigation') }}</h6>
          <NuxtLink v-for="item in navLinks" :key="item.to" :to="item.to" class="d-block mb-1" :class="textClass">
            {{ $t(item.label) }}
          </NuxtLink>
        </v-col>
        <v-col cols="6" sm="3">
          <h6 class="text-subtitle-1 mb-2">{{ $t('footer.sections.more') }}</h6>
          <NuxtLink to="/biography" class="d-block mb-1" :class="textClass">
            {{ $t('nav.biography') }}
          </NuxtLink>
          <a href="https://github.com/hivelogic2018/nuxt-vuetify-simple" target="_blank" class="d-block mb-1" :class="textClass">
            GitHub
          </a>
        </v-col>
      </v-row>

      <v-divider class="my-4" />
      <div class="text-caption text-center">
        &copy; {{ new Date().getFullYear() }} My App. {{ $t('footer.rights') }}
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useCookie } from '#app'
import { computed } from 'vue'

const theme = useTheme()
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const cookie = useCookie('theme-mode', {
  default: () => ({
    mode: 'system',
    primaryColor: '#3B82F6',
    neutralColor: '#6B7280'
  })
})

const systemPrefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches
const currentTheme = computed(() => {
  const mode = cookie.value?.mode ?? 'system'
  if (mode === 'system') return systemPrefersDark() ? 'dark' : 'light'
  return mode
})

const isDarkOrSepia = computed(() => ['dark', 'sepia'].includes(currentTheme.value))
const footerColor = computed(() => {
  switch (currentTheme.value) {
    case 'dark': return 'grey-darken-4'
    case 'sepia': return '#f1e7d0'
    default: return 'grey-lighten-4'
  }
})
const textClass = computed(() => isDarkOrSepia.value ? 'text-white' : 'text-black')

const { locale } = useI18n()
const langCookie = useCookie('lang', {
  default: () => 'en' // ✅ updated default language to English
})

type LanguageCode = 'en' | 'fr' | 'vi'
const languages = {
  en: 'English',
  fr: 'Français',
  vi: 'Tiếng Việt',
}

locale.value = languages[langCookie.value as LanguageCode] ? (langCookie.value as LanguageCode) : 'en'

const navLinks = [
  { label: 'nav.store', to: '/store' },
  { label: 'nav.chat', to: '/chat' },
  { label: 'nav.schedule', to: '/schedule' },
  { label: 'nav.guide', to: '/guide' },
]
</script>
