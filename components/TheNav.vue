<template>
  <v-app-bar flat color="background" elevation="1" class="px-4">
    <!-- Mobile menu toggle -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-sm-none" />

    <!-- App title -->
    <v-toolbar-title>
    <NuxtLink
      to="/"
      style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px;"
      :style="{ color: get(theme, 'global.current.value.colors.primary', '#1976d2') }"
    >
      <v-img :src="logoSrc" max-height="32" width="32" contain />
      {{ $t('nav.title') }}
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
            ? get(theme, 'global.current.value.colors.primary', '#1976d2')
            : get(theme, 'global.current.value.colors.neutral', '#333'),
        }"
      >
        <v-icon size="20" class="mr-1">{{ item.icon }}</v-icon>
        {{ $t(item.label) }}
      </NuxtLink>

    <!-- Dropdown: Liên Lạc -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" variant="text" class="text-subtitle-1 font-weight-bold">
          <v-icon size="20" class="mr-1">mdi-phone</v-icon>
          {{ $t('nav.contact') }}
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item :to="'/chat'" link>
          <v-list-item-title>{{ $t('nav.chat') }}</v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/schedule'" link>
          <v-list-item-title>{{ $t('nav.schedule') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Dropdown: Dịch Vụ -->
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" variant="text" class="text-subtitle-1 font-weight-bold">
          <v-icon size="20" class="mr-1">mdi-hammer-wrench</v-icon>
          {{ $t('nav.services') }}
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item :to="'/khoahoc'" link>
          <v-list-item-title>{{ $t('nav.courses') }}</v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/ungdung'" link>
          <v-list-item-title>{{ $t('nav.apps') }}</v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/dx'" link>
          <v-list-item-title>{{ $t('nav.digital') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>

    <v-spacer />
    <MonacoSyntaxHighlightingSwitcher />

    <!-- Language switcher -->
    <LanguageSwitcher class="mr-2" />

    <!-- Theme switcher -->
    <ThemeSwitcher class="mr-2" />

    <!-- Login Button -->
    <NuxtLink
      to="/login"
      class="d-inline-flex align-center text-white text-subtitle-1 font-weight-bold"
      style="text-decoration: none; padding: 8px 16px; border-radius: 6px;"
    >
      <v-icon size="20" class="mr-1" color="white">mdi-login</v-icon>
      {{ $t('nav.login') }}
    </NuxtLink>
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
import get from 'lodash/get'
import { useThemeLogo } from '../composables/useThemeLogo'

const theme = useTheme()
const $route = useRoute()
const drawer = ref(false)

const githubUrl = useRuntimeConfig().public.githubUrl

const navItems = [
  { label: 'nav.biography', to: '/bio', icon: 'mdi-account-box-outline' },
  { label: 'nav.guide', to: '/camnang', icon: 'mdi-compass-outline' },
  { label: 'nav.store', to: '/store', icon: 'mdi-store' },
]
// thêm trang các khoá học, dịch vụ, liên hệ

const { logoSrc } = useThemeLogo()
</script>
