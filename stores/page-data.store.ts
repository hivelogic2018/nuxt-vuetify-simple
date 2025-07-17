import { set, get } from 'lodash-es'
import { defineStore } from 'pinia'

export const usePageDataStore = defineStore('page-data', {
	state: () => ({
		data: {} as Record<string, unknown>,
		loading: false,
		error: null as string | null,
	}),
	actions: {
		setData(keyPath: string, value: unknown) {
			set(this.data, keyPath, value)
		},
	},
	getters: {
		getData: (state) => (keyPath: string) => {
			return get(state.data, keyPath)
		},
	},
})
