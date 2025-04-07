<script setup lang="ts">
import CategoryOption from './CategoryOption.vue'
import SearchIcon from './icons/SearchIcon.vue'
</script>

<template>
  <div class="border rounded-sm border-gray-300 flex bg-white w-full">
    <CategoryOption />
    <input type="text" class="w-full pr-2 py-3 focus:outline-none" />
    <div>
      <button class="h-full text-white font-semibold px-3 bg-gray-950 rounded-r-sm">
        <SearchIcon />
      </button>
    </div>
  </div>
</template>
