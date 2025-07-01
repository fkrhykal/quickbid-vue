<script setup lang="ts">
import WarnIcon from '@/components/icons/WarnIcon.vue'
defineProps<{ message: string }>()
</script>

<template>
  <div
    class="p-1 flex gap-x-1 mt-1 items-center w-fit rounded-sm bg-gray-100 border border-gray-200"
  >
    <WarnIcon class="size-4" />
    <p class="text-sm text-gray-500 first-letter:capitalize">{{ message }}</p>
  </div>
</template>
