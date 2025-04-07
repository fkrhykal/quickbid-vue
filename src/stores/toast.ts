import { defineStore } from 'pinia'

export type ToastOptions = {
  type: 'success' | 'info' | 'warn' | 'error'
  message: string
  timeout?: number
}

type InternalToast = ToastOptions & { id: string; timer: ReturnType<typeof setTimeout> }

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as InternalToast[],
  }),

  actions: {
    push(payload: ToastOptions) {
      const id = Date.now().toString(36)

      const timeout = payload.timeout ?? 2500

      const timer = setTimeout(() => this.destroy(id), timeout)

      this.toasts.push({ ...payload, id, timer })
    },

    destroy(id: string) {
      const index = this.toasts.findIndex((t) => t.id === id)
      if (index === -1) return

      const toast = this.toasts[index]
      if (toast.timer) {
        clearTimeout(toast.timer)
      }

      this.toasts.splice(index, 1)
    },
  },
})
