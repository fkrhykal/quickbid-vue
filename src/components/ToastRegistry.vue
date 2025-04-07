<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import ToastItem from './ToastItem.vue'

const toastStore = useToastStore()
</script>

<template>
  <TransitionGroup
    class="fixed bottom-4 right-4 z-50 flex flex-col items-end transition-all"
    name="toast"
    tag="div"
  >
    <ToastItem
      :key="toast.id"
      @click="toastStore.destroy(toast.id)"
      :toast
      v-for="toast in toastStore.toasts"
    />
  </TransitionGroup>
</template>

<style scoped>
.toast-enter-active {
  animation: bounce-in 0.65s ease-out;
}

.toast-leave-active {
  animation: slide-out 0.65s ease-in;
}

.toast-leave-from {
  transform: translateX(0) scale(1);
}

.toast-leave-to {
  transform: translateX(100%) scale(0.95);
}

@keyframes slide-out {
  0% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes bounce-in {
  0% {
    transform: translateX(100%) scale(0.99);
  }
  40% {
    transform: translateX(-10%);
  }
  60% {
    transform: translateX(5%) scale(0.99);
  }
  75% {
    transform: translateX(-3%);
  }
  90% {
    transform: translateX(2%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
