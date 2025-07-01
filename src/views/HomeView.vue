<script setup lang="ts">
import UpsideIcon from '@/components/icons/QuickbidIcon.vue'
import LatestAuction from '@/components/LatestAuction.vue'
import ProfileDetail from '@/components/ProfileDetail.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <header class="py-3 shadow-lg shadow-gray-100/10 bg-gray-950 text-white">
    <div class="container mx-auto px-3 flex justify-between items-center">
      <UpsideIcon class="h-[2.5rem] w-fit" />
      <div>
        <RouterLink v-if="!auth.isAccessTokenValid" to="/sign-in">
          <button class="bg-white text-slate-950 font-semibold px-4 py-2 rounded-sm">Login</button>
        </RouterLink>
        <ProfileDetail v-else />
      </div>
    </div>
  </header>
  <main class="container mx-auto px-3">
    <section class="py-4 grid place-items-center w">
      <SearchBar class="w-full" />
    </section>
    <section>
      <LatestAuction />
    </section>
  </main>
</template>
