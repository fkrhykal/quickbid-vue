<script setup lang="ts">
import Upside from '@/components/icons/UpsideGradientLogo.vue'
import { useAuthStore } from '@/stores/auth'
import { onBeforeMount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

onBeforeMount(() => {
  if (auth.bearerToken != null) {
    router.replace('/')
  }
})
</script>

<template>
  <main class="grid xl:grid-cols-2 min-h-screen">
    <section class="bg-gradient-to-bl from-black to-gray-800 hidden py-2 px-4 xl:grid">
      <RouterLink to="/">
        <Upside class="w-[8rem]" />
      </RouterLink>
    </section>
    <section class="flex justify-center md:items-center md:p-6">
      <slot></slot>
    </section>
  </main>
</template>
