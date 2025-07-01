import type { FormFn } from '@/hooks/form'
import type { Fail, Ok } from '@/hooks/response'
import { api, withErrorHandler } from '../utils'

type Payload = { username: string; password: string }

type Success = Ok<{
  code: 200
  data: { id: string; accessToken: string; refreshToken: string }
}>

type Failure = Fail<
  { code: 401; error: string } | { code: 500; error: string } | { code: 0; error: unknown }
>

export const createAccessToken: FormFn<Payload, Success, Failure> = async (payload, signal) => {
  const fn = async () => {
    const res = await fetch(api('/credentials'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
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
