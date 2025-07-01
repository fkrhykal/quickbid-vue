import { defineStore } from 'pinia'

export type ToastOption = {
  type: 'success' | 'info' | 'warn' | 'error'
  message: string
  timeout?: number
}

type Toast = Omit<ToastOption, 'timeout'> & { id: string; timer: ReturnType<typeof setTimeout> }

type State = {
  toasts: Toast[]
}

export const useToastStore = defineStore('toast', {
  state: (): State => ({
    toasts: [],
  }),
  actions: {
    push(option: ToastOption) {
      const id = Date.now().toString(36)
      const timeout = option.timeout ?? 2_500
      const timer = setTimeout(() => this.destroy(id), timeout)
      this.toasts.push({ message: option.message, type: option.type, id, timer })
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
