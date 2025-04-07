import { useToastStore } from '@/stores/toast'

export type Payload = {
  message: string
}

export function useToast() {
  const toast = useToastStore()
  return {
    info(message: string) {
      toast.push({
        message,
        type: 'info',
      })
    },
    error(message: string) {
      toast.push({
        message,
        type: 'error',
      })
    },
  }
}
