import AvatarImage from '@/components/AvatarImage.vue'
import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/vue3'

export default {
  component: AvatarImage,
} satisfies Meta<typeof AvatarImage>

export const Default: StoryObj<typeof AvatarImage> = {
  args: {
    image: faker.image.avatar(),
    initial: 'a',
    class: 'w-[4rem]',
  },
}
