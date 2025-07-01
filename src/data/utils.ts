import type { Fail } from '@/hooks/response'
import { useAuthStore } from '@/stores/auth'
import { refreshAccessToken } from './handler/refresh-access-token'

export function api(path: string, queryParams?: Record<string, string>) {
  const url = new URL(import.meta.env.VITE_API_URL + path)
  if (queryParams) {
    for (const key in queryParams) {
      url.searchParams.set(key, queryParams[key])
    }
  }
  return url
}

export function withErrorHandler<T>(
  fn: () => Promise<T>,
): () => Promise<T | Fail<{ code: 0; error: unknown }>> {
  return async () => {
    try {
      return await fn()
    } catch (error) {
      console.error(error)
      return {
        ok: false,
        code: 0,
        error,
      }
    }
  }
}

export function withBearerAuth<T>(
  fn: (bearer: string) => Promise<T>,
  signal: AbortSignal,
): () => Promise<T | Fail<{ code: 401; error: string }>> {
  return async () => {
    const auth = useAuthStore()
    if (auth.isAccessTokenValid) {
      return fn(auth.bearer)
    }
    if (!auth.isRefreshTokenValid) {
      return { ok: false, code: 401, error: 'Unauthorized' }
    }
    const res = await refreshAccessToken({ refreshToken: auth.refreshToken! }, signal)
    if (!res.ok) {
      auth.clear()
      return res
    }
    auth.setAccessToken(res.data.accessToken)
    return await fn(auth.bearer)
  }
}
