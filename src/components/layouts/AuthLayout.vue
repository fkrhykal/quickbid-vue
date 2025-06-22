<script setup lang="ts">
<<<<<<< HEAD
import Upside from '@/components/icons/UpsideGradientLogo.vue'
=======
import Upside from '@/components/icons/QuickbidGradientLogo.vue'
>>>>>>> 2239e4a (change upside to quickbid)
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
<<<<<<< HEAD
  <main class="grid xl:grid-cols-2 min-h-screen">
    <section class="bg-gradient-to-bl from-black to-gray-800 hidden py-2 px-4 xl:grid">
=======
  <main class="grid lg:grid-cols-2 min-h-screen">
    <section class="bg-gradient-to-bl from-black to-gray-800 hidden py-2 px-4 lg:grid">
>>>>>>> 2239e4a (change upside to quickbid)
      <RouterLink to="/">
        <Upside class="w-[8rem]" />
      </RouterLink>
    </section>
<<<<<<< HEAD
    <section class="flex justify-center md:items-center md:p-6">
=======
    <section class="flex justify-center items-center md:p-6">
>>>>>>> 2239e4a (change upside to quickbid)
      <slot></slot>
    </section>
  </main>
</template>
