import { onMounted, onUnmounted, ref } from 'vue'
import type { Fail, MaybePromise, Ok } from './response'

export type QueryFn<D, S, F> = (signal: AbortSignal) => Promise<Ok<S & { data: D }> | Fail<F>>

export function useQuery<D, S, F>(opt: {
  queryFn: QueryFn<D, S, F>
  onFailure?: (failure: Fail<F>) => MaybePromise<void>
  onSuccess?: (success: Ok<S>) => MaybePromise<void>
}) {
  const isLoading = ref(false)
  const data = ref<D>()
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
