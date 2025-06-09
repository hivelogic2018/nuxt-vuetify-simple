<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-card min-width="200" class="py-2">
      <v-list density="comfortable">
        <v-list-item
          v-for="(lang, code) in languages"
          :key="code"
          @click="setLanguage(code)"
          class="px-4"
        >
          <v-list-item-title class="text-subtitle-1">
            {{ lang }}
            <v-icon v-if="locale === code" size="20" class="ml-auto">mdi-check</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
// const langCookie = useCookie('lang', {
//   default: () => 'vi'
// })

type LanguageCode = 'en' | 'fr' | 'vi'

const languages = {
  en: 'English',
  fr: 'Français',
  vi: 'Tiếng Việt',
}

// locale.value = languages[langCookie.value as LanguageCode] ? (langCookie.value as LanguageCode) : 'vi'

function setLanguage(code: LanguageCode) {
  locale.value = code
}
</script>
