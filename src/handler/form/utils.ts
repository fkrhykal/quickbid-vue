import type { Fail } from '@/hooks/form'

export async function handleError<T>(
  fn: () => Promise<T>,
): Promise<T | Fail<{ code: 0; error: unknown }>> {
  try {
    return await fn()
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      code: 0,
      error,
    }
  }
}
