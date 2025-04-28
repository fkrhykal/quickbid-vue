<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  image: string | null
  initial: string
}>()

const show = ref(props.image !== null)

const handleImageError = () => {
  show.value = false
}

const handleImageLoad = () => {
  show.value = true
}
</script>

<template>
  <div class="size-full aspect-square">
    <img
      :class="{ hidden: !show }"
      @error="handleImageError"
      @load="handleImageLoad"
      v-if="image"
      class="size-full rounded-full"
      :src="image"
    />
    <div
      :class="{ hidden: show }"
      class="grid font-bold place-items-center capitalize size-full text-slate-950 bg-gray-200 rounded-full"
    >
      <p>{{ initial }}</p>
    </div>
  </div>
</template>
