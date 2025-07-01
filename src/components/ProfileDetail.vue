<script setup lang="ts">
import { getCurrentProfile } from '@/data/query/profile'
import { useQuery } from '@/hooks/query'
import { ref } from 'vue'
import AvatarImage from './AvatarImage.vue'

const isOpen = ref(false)

const hide = () => {
  isOpen.value = false
}

const { data: user } = useQuery({
  queryFn: getCurrentProfile,
})
</script>

<template>
  <div v-click-outside="hide">
    <div class="relative" @click="isOpen = !isOpen" v-if="user">
      <div class="size-12">
        <AvatarImage :initial="user.username[0]" />
      </div>
      <div
        v-if="isOpen"
        class="absolute mt-1 shadow space-y-1 right-0 py-2 px-2 min-w-fit whitespace-nowrap text-slate-950 w-fit bg-white rounded-sm"
      >
        <RouterLink to="">
          <p class="hover:bg-slate-100 py-1 px-2 rounded-sm">Sign Out</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
