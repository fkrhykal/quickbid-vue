import type { Fail, Handler, Ok } from '@/hooks/form'
import { api, handleError } from './utils'

export type SignUpPayload = {
  username: string
  password: string
}

export type SignUpSuccess = Ok<{ code: 201; data: { id: string } }>

export type SignUpFailure = Fail<
  | { code: 400; error: { username?: string; password?: string } }
  | { code: 409; error: string }
  | { code: 500; error: string }
  | { code: 0; error: unknown }
>

export const signUp: Handler<SignUpPayload, SignUpSuccess, SignUpFailure> = async (payload) => {
  return handleError(async () => {
    const res = await fetch(api('/sign-up'), {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await res.json()
    if (res.ok) {
      return {
        ok: true,
        code: res.status as SignUpSuccess['code'],
        data: result.data,
      } satisfies SignUpSuccess
    }
    return {
      ok: false,
      code: res.status as SignUpFailure['code'],
      error: result.error,
    } satisfies SignUpFailure
  })
}
