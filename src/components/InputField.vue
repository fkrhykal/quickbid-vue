<script setup lang="ts">
import { computed, ref } from 'vue'
import EyeIcon from './icons/EyeIcon.vue'
import EyeSlashIcon from './icons/EyeSlashIcon.vue'

const props = withDefaults(defineProps<{ type?: 'text' | 'password'; label?: string }>(), {
  type: 'text',
})

const model = defineModel<string>({ required: true, default: '' })

const focus = ref(false)

const active = computed(() => focus.value || model.value.length > 0)

const kind = ref(props.type)
</script>

<template>
  <div class="relative">
    <label
      v-if="label"
      class="absolute pointer-events-none top-[30%] ml-2 text-gray-600 font-gray-900 bg-white px-1 transition-all"
      for=""
      :class="{ '-translate-y-[130%] text-sm': active }"
      >{{ label }}</label
    >
    <input
      @focus="focus = true"
      @blur="focus = false"
      class="border w-full rounded-sm focus:outline-none focus:ring-4 focus:ring-slate-100 border-gray-300 py-4 px-3"
      :class="{ 'pr-12': type === 'password' }"
      v-model="model"
      :type="kind"
    />
    <button
      type="button"
      v-if="type === 'password'"
      class="absolute right-0 px-2.5 rounded-r-sm h-full cursor-pointer"
    >
      <EyeIcon class="w-6" @click="kind = 'text'" v-if="kind === 'password'" />
      <EyeSlashIcon class="w-6" @click="kind = 'password'" v-else />
    </button>
  </div>
</template>
