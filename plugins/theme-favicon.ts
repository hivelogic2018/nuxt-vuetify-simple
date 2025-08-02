import { useCookie } from '#app'

export default defineNuxtPlugin(() => {
  const cookie = useCookie('theme-mode', {
    default: () => ({
      mode: 'system'
    })
  })

  const getTheme = () => {
    const mode = cookie.value?.mode ?? 'system'
    if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return mode
  }

  const setFavicon = (theme: 'light' | 'dark') => {
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (link) {
      link.href =
        theme === 'dark'
          ? '/assets/icons/icon-dark-gold.png'
          : '/assets/icons/icon-light-gold.png'
    }
  }

  if (import.meta.client) {
    const currentTheme = getTheme() as 'light' | 'dark'
    setFavicon(currentTheme)

    if (cookie.value?.mode === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      media.addEventListener('change', (e) => {
        setFavicon(e.matches ? 'dark' : 'light')
      })
    }
  }
})