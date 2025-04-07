<script setup lang="ts">
import { faker } from '@faker-js/faker'
import AuctionCard, { type Auction } from './AuctionCard.vue'

const auctions: Auction[] = Array(10)
  .fill(undefined)
  .map(() => ({
    biddings: Array(10)
      .fill(undefined)
      .map<Auction['biddings'][0]>(() => ({
        id: faker.string.uuid(),
        amount: faker.number.int({ min: 10_000, max: 10_000 }),
        bidder: {
          avatar: faker.image.avatar(),
          id: faker.string.ulid(),
          username: faker.internet.username(),
        },
      })),
    lister: {
      avatar: faker.image.avatar(),
      id: faker.string.uuid(),
      username: faker.internet.username().slice(0, 24),
    },
    end: faker.date.soon().getTime(),
    id: faker.string.ulid(),
    minimumBid: faker.number.int({ min: 10_000, max: 10_000 }),
    product: {
      id: faker.string.ulid(),
      name: faker.commerce.productName(),
      picture: faker.image.url(),
    },
  }))
</script>

<template>
  <div>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-between w-full"
    >
      <li v-for="auction in auctions" :key="auction.id">
        <AuctionCard :auction class="w-full" />
      </li>
    </ul>
  </div>
</template>
