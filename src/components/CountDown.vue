<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{ end: number }>()
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const padStart = (n: number, maxLength: number = 2) => {
  return n.toString().padStart(maxLength, '0')
}

const refreshCountdown = () => {
  const now = Date.now()
  const diff = props.end - now
  if (diff < 0) {
    return
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

onMounted(() => {
  const interval = setInterval(refreshCountdown, 1_000)
  return () => {
    clearInterval(interval)
  }
})
</script>

<template>
  <div class="flex gap-1 justify-between p-1 border border-gray-200 rounded-sm">
    <div
      class="p-1 bg-slate-100 aspect-square grid place-items-center size-[3rem] text-center font-bold text-lg rounded-sm"
    >
      <p>
        {{ padStart(days, 3) }}
      </p>
    </div>
    <div
      class="p-1 bg-slate-100 aspect-square size-[3rem] grid place-items-center text-center font-bold text-lg rounded-sm"
    >
      <p>
        {{ padStart(hours) }}
      </p>
    </div>
    <div
      class="p-1 bg-slate-100 aspect-square size-[3rem] grid place-items-center text-center font-bold text-lg rounded-sm"
    >
      <p>
        {{ padStart(minutes) }}
      </p>
    </div>
    <div
      class="p-1 bg-slate-100 aspect-square size-[3rem] grid place-items-center text-center font-bold text-lg rounded-sm"
    >
      <p>
        {{ padStart(seconds) }}
      </p>
    </div>
  </div>
</template>
