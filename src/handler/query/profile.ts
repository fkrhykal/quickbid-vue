import { type QueryHandler } from '@/hooks/query'
import { useAuthStore } from '@/stores/auth'
import { api } from '..'

export type User = {
  id: string
  avatar: string | null
  username: string
}

type Success = { ok: true; code: 200; data: User }

type Failure =
  | { ok: false; code: 500; error: string }
  | { ok: false; code: 401; error: string }
  | { ok: false; code: 0; error: unknown }

export const getCurrentProfile: QueryHandler<User, Success, Failure> = async (signal) => {
  try {
    const auth = useAuthStore()
    if (auth.bearerToken === null) {
      return {
        ok: false,
        code: 401,
        error: 'Unauthorized',
      }
    }
    const response = await fetch(api('/users/_current'), {
      signal,
      headers: {
        Authorization: 'Bearer ' + auth.bearerToken,
      },
      method: 'GET',
    })
    if (response.ok) {
      const result = (await response.json()) as { code: 200; data: User }
      return {
        ok: true,
        code: 200,
        data: result.data,
      }
    }
    const result = (await response.json()) as
      | { code: 500; error: string }
      | { code: 401; error: string }
    return {
      ok: false,
      code: result.code,
      error: result.error,
    }
  } catch (e: unknown) {
    return {
      ok: false,
      code: 0,
      error: e,
    }
  }
}
