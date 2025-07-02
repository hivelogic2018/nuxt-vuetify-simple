import { defineStore } from 'pinia'
import { set, get } from 'lodash-es'

export const usePageDataStore = defineStore('page-data', {
  state: () => ({
    data: {} as Record<string, any>,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    setData(keyPath: string, value: any) {
      set(this.data, keyPath, value)
    },
  },
  getters: {
    getData: (state) => (keyPath: string) => {
      return get(state.data, keyPath)
    },
  },
})