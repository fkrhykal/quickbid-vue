import type { FormFn } from '@/hooks/form'
import type { Fail, Ok } from '@/hooks/response'
import { api, withErrorHandler } from '../utils'

type Payload = {
  username: string
  password: string
}

type Success = Ok<{ code: 201; data: { id: string } }>

type Failure = Fail<
  | { code: 400; error: { username?: string; password?: string } }
  | { code: 409; error: string }
  | { code: 500; error: string }
  | { code: 0; error: unknown }
>

export const createUser: FormFn<Payload, Success, Failure> = async (payload, signal) => {
  const fn = async () => {
    const res = await fetch(api('/users'), {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    })
    const result = await res.json()
    if (res.ok) {
      return {
        ok: true,
        code: res.status,
        data: result.data,
      } as Success
    }
    return {
      ok: false,
      code: res.status,
      error: result.error,
    } as Failure
  }
  return withErrorHandler(fn)()
}
