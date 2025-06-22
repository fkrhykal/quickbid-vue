import { onMounted, onUnmounted, ref } from 'vue'
import type { MaybePromise } from './form'

export type Fail<E> = { ok: false } & E

export type Ok<D extends { data: Data }, Data> = { ok: true } & D

export type QueryHandler<Data, D extends { data: Data }, E> = (
  signal: AbortSignal,
) => Promise<Ok<D, Data> | Fail<E>>

export function useQuery<D extends { data: Data }, Data, E>(opt: {
  queryFn: QueryHandler<Data, D, E>
  onFailure?: (error: E) => MaybePromise<void>
  onSuccess?: (data: D) => MaybePromise<void>
}) {
  const isLoading = ref(false)
  const data = ref<Data>()
  const controller = new AbortController()

  onMounted(async () => {
    isLoading.value = true
    const res = await opt.queryFn(controller.signal)
    if (!res.ok) {
      isLoading.value = false
      return opt.onFailure?.(res)
    }
    data.value = res.data
    isLoading.value = false
    return opt.onSuccess?.(res)
  })

  onUnmounted(() => {
    controller.abort()
  })

  return { isLoading, data }
}
