import { onUnmounted, reactive, ref, toRefs } from 'vue'
import type { Fail, MaybePromise, Ok } from './response'

type ValidationError<T> = { code: 400; error: { [K in keyof T]: string } }

type Field = string | number

type Payload = Record<string, Field>

type Errors<T> = Partial<T> & Record<string, string | undefined>

export type FormFn<T, D, E> = (payload: T, signal: AbortSignal) => Promise<Ok<D> | Fail<E>>

export function useForm<T extends Payload, D, E>(
  defaultValue: T,
  options: {
    formFn: FormFn<T, D, E>
    onSuccess?: (success: D) => MaybePromise<void>
    onFailure?: (fail: E) => MaybePromise<void>
  },
) {
  const payload = reactive<T>({ ...defaultValue })
  const errors = reactive<Errors<T>>({})
  const isLoading = ref(false)
  const controller = new AbortController()

  const setError = (key: string, value: string) => ((errors as Partial<Payload>)[key] = value)
  const clearError = (key: string) => ((errors as Partial<Payload>)[key] = undefined)

  const submit = async () => {
    isLoading.value = true
    const res = await options.formFn(payload as T, controller.signal)
    isLoading.value = false
    if (res.ok) {
      return options.onSuccess?.(res)
    }
    if (isValidationError<T>(res)) {
      for (const key in res.error) {
        setError(key, res.error[key])
      }
    }
    return options.onFailure?.(res)
  }

  onUnmounted(() => {
    controller.abort()
  })

  return { ...toRefs(payload), submit, isLoading, errors, setError, clearError }
}

function isValidationError<T>(
  fail: Fail<{ [key: string]: unknown }>,
): fail is Fail<ValidationError<T>> {
  return fail.code === 400 && typeof fail.error === 'object'
}
