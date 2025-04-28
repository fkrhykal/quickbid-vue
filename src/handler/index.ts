export function api(path: string, queryParams?: Record<string, string>) {
  const url = new URL(import.meta.env.VITE_API_URL + path)
  if (queryParams) {
    for (const key in queryParams) {
      url.searchParams.set(key, queryParams[key])
    }
  }
  return url
}
