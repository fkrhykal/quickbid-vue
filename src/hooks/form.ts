import { reactive, ref, toRefs } from 'vue'

export type ValidationError<T> = { code: 400; error: { [K in keyof T]: string } }

export type Fail<E> = { ok: false } & E

export type Ok<D> = { ok: true } & D

export type Handler<T, D, E> = (args: T) => Promise<Ok<D> | Fail<E>>

export type Payload = { [key: string]: any }

export type MaybePromise<T> = Promise<T> | T

export type Optional<T> = {
  [K in keyof T]?: string | undefined
}

export function useForm<T extends Payload, D, E>(
  defaultValue: T,
  options: {
    handler: Handler<T, D, E>
    onFailure: (failure: E) => MaybePromise<void>
    onSuccess: (success: D) => MaybePromise<void>
  },
) {
  const payload = reactive<T>({ ...defaultValue })
  const errors = reactive<Optional<T>>({})
  const isLoading = ref(false)
  const setError = (key: keyof T, value: string) => ((errors as Optional<T>)[key] = value)
  const clearError = (key: keyof T) => ((errors as Optional<T>)[key] = undefined)

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

function isValidationError<T>(failure: Fail<any>): failure is Fail<ValidationError<T>> {
  return failure.code === 400 && typeof failure.error === 'object'
}
