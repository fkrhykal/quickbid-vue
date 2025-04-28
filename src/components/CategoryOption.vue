<script setup lang="ts">
import { faker } from '@faker-js/faker'
import { ref } from 'vue'
import CategoryIcon from './icons/CategoryIcon.vue'

const options = Array(10).fill(null).map(faker.color.human)

options[0] = options[0] + 'nsdwenferbfrufrefnr dnfeuidberfrri fnrui'

const isOpen = ref(false)
const selected = ref<string | null>(null)

const close = () => {
  isOpen.value = false
}
const select = (v: string) => {
  selected.value = v
  close()
}
</script>

<template>
  <div v-click-outside="close" class="relative min-h-full z-50">
    <button class="h-full min-w-12 grid rounded-l-sm p-1.5" @click="isOpen = !isOpen">
      <p
        class="truncate w-20 p-1.5 bg-gray-200 rounded-md whitespace-nowrap place-self-start self-center min-w-[4rem]"
        v-if="selected"
      >
        {{ selected }}
      </p>
      <div class="place-self-center self-center" v-else>
        <CategoryIcon />
      </div>
    </button>
    <ul
      v-if="isOpen"
      class="absolute border shadow-lg border-slate-200 rounded-sm p-1.5 top-[110%] left-0 bg-white"
    >
      <li
        @click="select(v)"
        class="p-2 truncate min-w-[10rem] max-w-[20rem] hover:bg-gray-100 rounded-sm whitespace-nowrap"
        :class="{ 'bg-gray-200': v === selected }"
        :key="v"
        v-for="v in options"
      >
        {{ v }}
      </li>
    </ul>
  </div>
</template>
