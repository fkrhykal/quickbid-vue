<script lang="ts">
type Bidder = {
  id: string
  username: string
  avatar: string
}

type Bidding = {
  id: string
  bidder: Bidder
  amount: number
}

type Product = {
  id: string
  name: string
  picture: string
}

type Lister = {
  id: string
  username: string
  avatar: string
}

export type Auction = {
  id: string
  end: number
  product: Product
  lister: Lister
  minimumBid: number
  biddings: Bidding[]
}
</script>

<script setup lang="ts">
import AvatarImage from './AvatarImage.vue'
import CountDown from './CountDown.vue'

defineProps<{ auction: Auction }>()
</script>

<template>
  <div class="border rounded-sm border-gray-300 p-2">
    <div class="relative">
      <div
        class="shape absolute top-1 right-1 bg-gray-100/70 hover:bg-gray-100 transition-all py-1 pl-1 pr-4 flex items-center gap-x-2"
      >
        <AvatarImage
          class="w-[2rem]"
          :image="auction.lister.avatar"
          :initial="auction.lister.username[0]"
        />
        <div>
          <p class="text-sm font-semibold">{{ auction.lister.username }}</p>
        </div>
      </div>
      <div class="aspect-square flex overflow-hidden bg-gray-50">
        <img
          loading="lazy"
          class="object-cover rounded-sm flex-1"
          :src="auction.product.picture"
          alt=""
        />
      </div>
      <CountDown class="absolute bottom-[0.5rem] left-[0.5rem]" :end="auction.end" />
    </div>
    <div class="pt-4 font-semibold">
      <p class="">{{ auction.product.name }}</p>
    </div>
    <div class="flex items-center justify-between mt-4">
      <div class="text-2xl bg-gray-50 p-2 font-semibold w-fit rounded-sm">
        <p>
          {{
            Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumFractionDigits: 0,
            }).format(auction.biddings[0]?.amount ?? auction.minimumBid)
          }}
        </p>
      </div>
      <div v-if="auction.biddings.length > 0">
        <ul class="flex items-center">
          <li
            v-for="(bidding, i) in auction.biddings.slice(0, 4)"
            :key="bidding.id"
            class="-ml-2 size-7 md:size-6 xl:size-7 first:size-8 xl:first:size-9"
            :style="{
              'z-index': `${auction.biddings.length - i}`,
            }"
          >
            <AvatarImage :image="bidding.bidder.avatar" :initial="bidding.bidder.username[0]" />
          </li>
          <li
            v-if="auction.biddings.length > 4"
            class="size-7 md:size-6 xl:size-7 text-xs grid place-items-center bg-gray-200 -ml-2 rounded-full font-semibold"
          >
            <p>+{{ auction.biddings.length - 4 }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.shape {
  border-radius: 120px 15px 15px 120px;
}
</style>
