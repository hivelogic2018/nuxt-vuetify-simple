<template>
  <v-footer app :color="footerColor" class="py-2 px-4 px-sm-10" :class="textClass">
    <v-container>
  <div class="d-flex mb-2">
        <div class="d-flex align-center mb-2">
    <v-btn variant="text" density="compact" icon @click="expanded = !expanded" class="me-2">
    <v-icon>{{ expanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
    </v-btn>
    <v-img
      src="/logo/hocngheIT-penguin-logo.png"
      alt="Logo"
      width="48"
      max-height="48"
      class="me-2"
      
    />
    <h4 class="text-h6 mb-2 mb-sm-0">{{ $t('nav.title') }}</h4>
       </div>
      </div>
      <v-expand-transition>
        <div v-show="expanded">
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
                  <v-list-item :to="'/bio'" link>
                    <v-list-item-title>{{ $t('nav.biography') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-item :href="githubUrl" target="_blank">
                    <v-list-item-title>GitHub</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-row v-else>
            <v-col cols="12" sm="6">
              <p class="text-caption">
                {{ $t('footer.description') }}
              </p>
              <v-divider class="my-4" />
              <div class="d-flex justify-center justify-md-start mb-2">
                <v-btn
                  v-for="icon in socialIcons"
                  :key="icon.icon"
                  :href="icon.href"
                  target="_blank"
                  variant="text"
                  class="mx-1"
                  size="small"
                >
                  <v-icon size="20">{{ icon.icon }}</v-icon>
                </v-btn>
              </div>
              <div class="text-caption">
                &copy; {{ new Date().getFullYear() }} by the Golden West Consulting INC {{ $t('footer.rights') }}
              </div>
            </v-col>
            <v-col cols="4" sm="2"></v-col>
            <v-col cols="4" sm="2">
              <h6 class="text-subtitle-1 mb-2">{{ $t('footer.sections.navigation') }}</h6>
              <NuxtLink
                v-for="item in navLinks"
                :key="item.to"
                :to="item.to"
                class="d-block mb-1"
                :class="textClass"
              >
                {{ $t(item.label) }}
              </NuxtLink>
            </v-col>
            <v-col cols="4" sm="2">
              <h6 class="text-subtitle-1 mb-2">{{ $t('footer.sections.more') }}</h6>
              <NuxtLink to="/bio" class="d-block mb-1" :class="textClass">
                {{ $t('nav.biography') }}
              </NuxtLink>
              <a :href="githubUrl" target="_blank" class="d-block mb-1" :class="textClass">
                GitHub
              </a>
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useCookie, useRuntimeConfig } from '#app'
import { computed, ref } from 'vue'

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)
const expanded = ref(true)

const cookie = useCookie('theme-mode', {
  default: () => ({
    mode: 'system',
    primaryColor: '#3B82F6',
    neutralColor: '#6B7280'
  })
})

const systemPrefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false

const currentTheme = computed(() => {
  const mode = cookie.value?.mode ?? 'system'
  if (mode === 'system') return systemPrefersDark() ? 'dark' : 'light'
  return mode
})

const footerColor = computed(() => {
  switch (currentTheme.value) {
    case 'dark':
      return 'grey-darken-4'
    case 'sepia':
      return '#f1e7d0'
    default:
      return 'grey-lighten-4'
  }
})

const textClass = computed(() => {
  switch (currentTheme.value) {
    case 'dark':
      return 'text-white'
    case 'sepia':
      return cookie.value?.neutralColor
        ? `text-${cookie.value.neutralColor.replace('#', '')}`
        : 'text-brown'
    default:
      return 'text-black'
  }
})

const navLinks = [
  { label: 'nav.store', to: '/store' },
  { label: 'nav.chat', to: '/chat' },
  { label: 'nav.schedule', to: '/schedule' },
  { label: 'nav.guide', to: '/camnang' }
]

const githubUrl = useRuntimeConfig().public.githubUrl

const socialIcons = [
  { icon: 'mdi-facebook', href: 'https://facebook.com' },
  { icon: 'mdi-linkedin', href: 'https://linkedin.com' },
  { icon: 'mdi-youtube', href: 'https://www.youtube.com/@dayngheIT' },
  { icon: 'mdi-github', href: githubUrl } 
]
</script>

<style scoped>
.text-caption {
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>
