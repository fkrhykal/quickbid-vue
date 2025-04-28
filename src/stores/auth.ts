import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      bearerToken: localStorage.getItem('BEARER_TOKEN'),
    }
  },
  actions: {
    setToken(bearerToken: string) {
      localStorage.setItem('BEARER_TOKEN', bearerToken)
      this.bearerToken = bearerToken
    },
    removeToken() {
      localStorage.removeItem('BEARER_TOKEN')
      this.$reset()
    },
  },
})
