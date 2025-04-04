import type { Fail, Handler, Ok } from '@/hooks/form'

export type SignUpPayload = {
  username: string
  password: string
}
export type SignUpSuccess = Ok<{ code: 201; data: { id: string } }>

export type SignUpFailure = Fail<
  { code: 400; error: { username?: string; password?: string } } | { code: 409; error: string }
>

export const signUp: Handler<SignUpPayload, SignUpSuccess, SignUpFailure> = async (payload) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/sign-up`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  if (res.ok) {
    return {
      code: res.status,
      data: result.data,
    } as SignUpSuccess
  }
  return {
    code: res.status,
    error: result.error,
  } as SignUpFailure
}
