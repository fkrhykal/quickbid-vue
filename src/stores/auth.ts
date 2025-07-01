import { defineStore } from 'pinia'

type Auth = {
  accessToken: string
  refreshToken: string
}

type Nullable<T> = { [P in keyof T]: T[P] | null }

type State = Nullable<Auth>

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      accessToken: localStorage.getItem(ACCESS_TOKEN),
      refreshToken: localStorage.getItem(REFRESH_TOKEN),
    }
  },
  actions: {
    init(auth: Auth) {
      this.$state = auth
      localStorage.setItem(ACCESS_TOKEN, auth.accessToken)
      localStorage.setItem(REFRESH_TOKEN, auth.refreshToken)
    },
    clear() {
      localStorage.removeItem(ACCESS_TOKEN)
      localStorage.removeItem(REFRESH_TOKEN)
      this.$reset()
    },
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken
      localStorage.setItem(ACCESS_TOKEN, accessToken)
    },
  },
  getters: {
    bearer(state): string {
      if (state.accessToken === null) {
        throw new Error("couldn't get bearer because access token is invalid")
      }
      return `Bearer ${state.accessToken}`
    },
    isAccessTokenValid(state): boolean {
      return isTokenValid(state.accessToken)
    },
    isRefreshTokenValid(state): boolean {
      return isTokenValid(state.refreshToken)
    },
  },
})

function isTokenValid(token: string | null): boolean {
  try {
    if (token === null) {
      return false
    }
    const base64Payload = token.split('.')[1]
    const jsonPayload = atob(base64Payload)
    const payload = JSON.parse(jsonPayload)
    if (hasExpiration(payload)) {
      return payload.exp * 1_000 > Date.now() - 5_000 * 60
    }
    return false
  } catch (error) {
    console.error('failed to parse token', error)
    return false
  }
}

interface HasExpiration {
  exp: number
}

function hasExpiration(v: unknown): v is HasExpiration {
  const prop = Object.getOwnPropertyDescriptor(v, 'exp')
  if (prop === undefined) {
    return false
  }
  return typeof prop.value === 'number'
}
