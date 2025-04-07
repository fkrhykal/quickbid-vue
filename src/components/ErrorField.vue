<script setup lang="ts">
import WarnIcon from '@/components/icons/WarnIcon.vue'
defineProps<{ message: string }>()
</script>

<template>
  <div
    class="px-1 flex gap-x-1 items-center w-fit py-1 rounded-sm bg-gray-100 border border-gray-200 mt-1"
  >
    <WarnIcon class="size-4" />
    <p class="text-xs text-gray-500 first-letter:capitalize">{{ message }}</p>
  </div>
</template>
