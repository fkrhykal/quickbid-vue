<script setup lang="ts">
import type { ToastOptions } from '@/stores/toast'
import WarnIcon from './icons/WarnIcon.vue'

defineProps<{ toast: ToastOptions }>()
</script>

<template>
  <div
    class="px-4 py-4 rounded-sm shadow mb-2 min-w-[250px] max-w-sm flex gap-x-2 items-center cursor-pointer"
    :class="{
      'bg-red-50 text-red-500 ring-2 ring-red-300': toast.type === 'error',
    }"
  >
    <div>
      <WarnIcon class="size-[1.5rem]" />
    </div>
    <div class="space-y-1">
      <p class="text-sm font-semibold">
        {{ toast.message }}
      </p>
    </div>
  </div>
</template>
