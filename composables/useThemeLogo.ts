export const useThemeLogo = () => {
    const themeCookie = useCookie('theme-mode', {
      default: () => ({
        mode: 'system'
      })
    })
  
    const systemPrefersDark = () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  
    const currentTheme = computed(() => {
      const mode = themeCookie.value?.mode ?? 'system'
      if (mode === 'system') return systemPrefersDark() ? 'dark' : 'light'
      return mode
    })
  
    const logoSrc = computed(() => {
      return currentTheme.value === 'dark'
        ? '/assets/icons/icon-dark-gold.png'
        : '/assets/icons/icon-light-gold.png'
    })
  
    return { logoSrc }
  }
  