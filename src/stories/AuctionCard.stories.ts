import AuctionCard from '@/components/AuctionCard.vue'
import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof AuctionCard> = {
  component: AuctionCard,
}

export const Default: StoryObj<typeof AuctionCard> = {
  args: {
    auction: {
      biddings: [
        {
          id: faker.string.ulid(),
          amount: 6_000,
          bidder: {
            id: faker.string.uuid(),
            username: faker.internet.username(),
            avatar: faker.image.avatar(),
          },
        },
        {
          id: faker.string.ulid(),
          amount: 6_000,
          bidder: {
            id: faker.string.uuid(),
            username: faker.internet.username(),
            avatar: faker.image.avatar(),
          },
        },
        {
          id: faker.string.ulid(),
          amount: 6_000,
          bidder: {
            id: faker.string.uuid(),
            username: faker.internet.username(),
            avatar: faker.image.avatar(),
          },
        },
        {
          id: faker.string.ulid(),
          amount: 6_000,
          bidder: {
            id: faker.string.uuid(),
            username: faker.internet.username(),
            avatar: faker.image.avatar(),
          },
        },
        {
          id: faker.string.ulid(),
          amount: 6_000,
          bidder: {
            id: faker.string.uuid(),
            username: faker.internet.username(),
            avatar: faker.image.avatar(),
          },
        },
        {
          id: faker.string.ulid(),
          amount: 6_000,
          bidder: {
            id: faker.string.uuid(),
            username: faker.internet.username(),
            avatar: faker.image.avatar(),
          },
        },
        {
          id: faker.string.ulid(),
          amount: 6_000,
          bidder: {
            id: faker.string.uuid(),
            username: faker.internet.username(),
            avatar: faker.image.avatar(),
          },
        },
        {
          id: faker.string.ulid(),
          amount: 6_000,
          bidder: {
            id: faker.string.uuid(),
            username: faker.internet.username(),
            avatar: faker.image.avatar(),
          },
        },
      ],
      lister: {
        id: faker.string.uuid(),
        username: faker.internet.username(),
        avatar: faker.image.avatar(),
      },
      end: faker.date.soon().getTime(),
      id: faker.string.ulid(),
      minimumBid: 5000,
      product: {
        id: faker.string.ulid(),
        name: faker.commerce.productName(),
        picture: faker.image.urlPicsumPhotos(),
      },
    },
  },
}

export default meta
