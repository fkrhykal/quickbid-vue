import type { Fail, FormHandler, Ok } from '@/hooks/form'

import { api } from '@/handler'
import { handleError } from './utils'

export type SignInPayload = { username: string; password: string }

export type SignInSuccess = Ok<{ code: 200; data: { id: string; bearerToken: string } }>

export type SignInFailure =
  | Fail<{ code: 401; error: string }>
  | Fail<{ code: 500; error: string }>
  | Fail<{ code: 0; error: unknown }>

export const signIn: FormHandler<SignInPayload, SignInSuccess, SignInFailure> = async (payload) => {
  return handleError(async () => {
    const res = await fetch(api('/sign-in'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const result = await res.json()
    if (res.ok) {
      return {
        ok: true,
        code: res.status,
        data: result.data,
      } as SignInSuccess
    }
    return {
      ok: false,
      code: res.status,
      error: result.error,
    } as SignInFailure
  })
}
