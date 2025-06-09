<template>
  <v-app-bar flat color="background" elevation="1" class="px-4">
    <!-- Mobile menu toggle -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-sm-none" />

    <!-- App title -->
    <v-toolbar-title>
      <NuxtLink
        to="/"
        style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px;"
        :style="{ color: theme.global.current.value.colors.primary }"
      >
        <v-icon size="24">mdi-home-circle-outline</v-icon>
        My App
      </NuxtLink>
    </v-toolbar-title>

    <!-- Desktop navigation links -->
    <div class="d-none d-sm-flex align-center gap-2">
      <NuxtLink
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.to"
        class="text-subtitle-1 font-weight-bold d-inline-flex align-center"
        style="text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 1.2rem;"
        :style="{
          color: $route.path === item.to
            ? theme.global.current.value.colors.primary
            : theme.global.current.value.colors.neutral
        }"
      >
        <v-icon size="20" class="mr-1">{{ item.icon }}</v-icon>
        {{ item.label }}
      </NuxtLink>
    </div>

    <v-spacer />

    <!-- Language switcher -->
    <LanguageSwitcher class="mr-2" />

    <!-- Theme switcher + GitHub icon -->
    <ThemeSwitcher class="mr-2" />
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

  <!-- Mobile drawer -->
  <v-navigation-drawer v-model="drawer" temporary class="d-sm-none">
    <v-list>
      <v-list-item
        v-for="(item, index) in navItems"
        :key="index"
        :to="item.to"
        link
        @click="drawer = false"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <v-list-item-title>{{ $t(item.label) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import ThemeSwitcher from './ThemeSwitcher.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useCookie } from '#app'

type LanguageCode = 'en' | 'fr' | 'vi'
const languages = {
  en: 'English',
  fr: 'Français',
  vi: 'Tiếng Việt'
}

const theme = useTheme()
const $route = useRoute()
const drawer = ref(false)

const { locale } = useI18n()
const langCookie = useCookie('lang', { default: () => 'en' })

locale.value = languages[langCookie.value as LanguageCode] ? (langCookie.value as LanguageCode) : 'en'

const githubUrl = import.meta.env.VITE_GITHUB_URL

const navItems = [
  { label: 'nav.biography', to: '/bio', icon: 'mdi-account-box-outline' },
  { label: 'nav.guide', to: '/camnang', icon: 'mdi-compass-outline' },
  { label: 'nav.store', to: '/store', icon: 'mdi-store' },
  { label: 'nav.chat', to: '/chat', icon: 'mdi-chat' },
  { label: 'nav.schedule', to: '/schedule', icon: 'mdi-calendar-clock' }
]
</script>
