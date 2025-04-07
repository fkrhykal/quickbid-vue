<script setup lang="ts">
import UpsideIcon from '@/components/icons/UpsideIcon.vue'
import LatestAuction from '@/components/LatestAuction.vue'
import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
  <header class="p-3 shadow-lg shadow-gray-100/10 bg-gray-950 text-white">
    <div class="container mx-auto">
      <UpsideIcon class="h-[2.5rem] w-fit" />
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
