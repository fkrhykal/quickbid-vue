<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  image: string
  initial: string
}>()

const show = ref(false)

const handleImageError = (error: Event) => {
  console.error({ error })
  show.value = false
}

const handleImageLoad = (load: Event) => {
  console.info({ load })
  show.value = true
}
</script>

<template>
  <div class="size-full aspect-square">
    <img
      :class="{ hidden: !show }"
      @error="handleImageError"
      @load="handleImageLoad"
      class="size-full rounded-full"
      :src="image"
    />
    <div
      :class="{ hidden: show }"
      class="grid font-bold place-items-center capitalize size-full bg-gray-200 rounded-full"
    >
      <p>{{ initial }}</p>
    </div>
  </div>
</template>
