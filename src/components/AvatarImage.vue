<script setup lang="ts">
defineProps<{ initial: string }>()
</script>

<template>
  <div class="size-full aspect-square cursor-pointer">
    <div
      class="grid font-bold place-items-center capitalize size-full text-slate-950 bg-gray-200 rounded-full"
    >
      <p>{{ initial }}</p>
    </div>
  </div>
</template>
