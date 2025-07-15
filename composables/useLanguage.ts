import { useI18n } from 'vue-i18n'
import { useCookie } from '#app'
import { watch } from 'vue'

export type LanguageCode = 'en' | 'fr' | 'vi'

export const languages: Record<LanguageCode, string> = {
	en: 'English',
	fr: 'Français',
	vi: 'Tiếng Việt',
}

export function useLanguage() {
	const { locale, setLocale } = useI18n()
	const langCookie = useCookie('lang', { default: () => 'en' })

	// Ensure locale and cookie are in sync
	const setLanguage = async (code: LanguageCode) => {
		await setLocale(code)
		langCookie.value = code
	}

	// On load, sync locale with cookie if valid
	if (languages[langCookie.value as LanguageCode]) {
		locale.value = langCookie.value as LanguageCode
	} else {
		locale.value = 'en'
		langCookie.value = 'en'
	}

	// Watch for changes and log (optional)
	watch(locale, (newLocale) => {
		langCookie.value = newLocale as LanguageCode
		// console.log('Locale changed to:', newLocale)
	})

	return {
		locale,
		langCookie,
		languages,
		setLanguage,
	}
}