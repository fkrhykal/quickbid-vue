import { reactive, ref, toRefs } from 'vue'

export type ValidationError<T> = { code: 400; error: { [K in keyof T]: string } }

export type Fail<E> = { ok: false } & E

export type Ok<D> = { ok: true } & D

export type Handler<T, D, E> = (args: T) => Promise<Ok<D> | Fail<E>>

export type Field = string | number

export type Payload = Record<string, Field>

export type MaybePromise<T> = Promise<T> | T

export type Optional<T> = {
  [K in keyof T]?: string | undefined
}

export type Errors<T> = Optional<T> & Record<string, string | undefined>

export function useForm<T extends Payload, D, E>(
  defaultValue: T,
  options: {
    handler: Handler<T, D, E>
    onSuccess: (success: D) => MaybePromise<void>
    onFailure: (fail: E) => MaybePromise<void>
  },
) {
  const payload = reactive<T>({ ...defaultValue })
  const errors = reactive<Errors<T>>({})
  const isLoading = ref(false)

  const setError = (key: string, value: string) =>
    ((errors as Record<string, string | undefined>)[key] = value)
  const clearError = (key: string) =>
    ((errors as Record<string, string | undefined>)[key] = undefined)

  const submit = async () => {
    isLoading.value = true
    const res = await options.handler(payload as T)
    isLoading.value = false
    if (res.ok) {
      return options.onSuccess(res)
    }
    if (isValidationError<T>(res)) {
      for (const key in res.error) {
        setError(key, res.error[key])
      }
      return
    }
    return options.onFailure(res)
  }
  return { ...toRefs(payload), submit, isLoading, errors, setError, clearError }
}

function isValidationError<T>(
  fail: Fail<{ [key: string]: unknown }>,
): fail is Fail<ValidationError<T>> {
  return fail.code === 400 && typeof fail.error === 'object'
}
