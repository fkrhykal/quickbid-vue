import type { Fail } from '@/hooks/form'

export function api(path: string, queryParams?: Record<string, string>) {
  const url = new URL(import.meta.env.VITE_API_URL + path)
  if (queryParams) {
    for (const key in queryParams) {
      url.searchParams.set(key, queryParams[key])
    }
  }
  return url
}

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
