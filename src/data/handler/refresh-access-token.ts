import type { Fail, Ok } from '@/hooks/response'
import { api } from '../utils'

export type Handler<T, D, E> = (payload: T, signal: AbortSignal) => Promise<Ok<D> | Fail<E>>

type Payload = {
  refreshToken: string
}

type Success = Ok<{ code: 200; data: { accessToken: string } }>

type Failure = Fail<{ code: 401; error: string }>

export const refreshAccessToken: Handler<Payload, Success, Failure> = async (
  { refreshToken },
  signal,
) => {
  const res = await fetch(api('/credentials/refresh-token'), {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
    headers: {
      'Content-Type': 'application/json',
    },
    signal,
  })
  const result = await res.json()
  if (res.ok) {
    return {
      ok: true,
      code: 200,
      data: { accessToken: result.accessToken },
    }
  }
  return {
    ok: false,
    code: 401,
    error: 'Unauthorized',
  }
}
