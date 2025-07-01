import { type QueryFn } from '@/hooks/query'
import type { Fail, Ok } from '@/hooks/response'
import { api, withBearerAuth, withErrorHandler as withErrorCatcher } from '../utils'

type UserProfile = {
  id: string
  username: string
}

type Success = Ok<{ code: 200; data: UserProfile }>

type Failure = Fail<
  { code: 500; error: string } | { code: 401; error: string } | { code: 0; error: unknown }
>

export const getCurrentProfile: QueryFn<UserProfile, Success, Failure> = async (signal) => {
  const fn = async (bearer: string) => {
    const response = await fetch(api('/users/current'), {
      headers: {
        Authorization: bearer,
      },
      method: 'GET',
      signal,
    })
    if (response.ok) {
      const result = await response.json()
      return {
        ok: true,
        code: 200,
        data: result.data,
      } as Success
    }
    const result = await response.json()
    return {
      ok: false,
      code: result.code,
      error: result.error,
    } as Failure
  }
  return withErrorCatcher(withBearerAuth(fn, signal))()
}
