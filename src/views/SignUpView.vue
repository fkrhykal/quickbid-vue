<script setup lang="ts">
import LoaderCircle from '@/components/icons/LoaderCircle.vue'
import Upside from '@/components/icons/Upside.vue'
import Input from '@/components/Input.vue'
import InputError from '@/components/InputError.vue'
import { signUp } from '@/handler/sign-up'
import { useForm } from '@/hooks/form'
import { useRouter } from 'vue-router'

const router = useRouter()

const { username, password, isLoading, errors, submit, setError, clearError } = useForm(
  {
    username: '',
    password: '',
  },
  {
    handler: signUp,
    onFailure(failure) {
      if (failure.code === 409) {
        setError('username', failure.error)
      }
    },
    onSuccess() {
      router.push('/sign-in')
    },
  },
)
</script>

<template>
  <main class="grid xl:grid-cols-2 min-h-screen">
    <section class="bg-gradient-to-bl from-black to-gray-800 hidden py-2 px-4 xl:grid">
      <Upside class="w-[8rem]" />
    </section>
    <section class="flex justify-center md:items-center md:p-6">
      <div
        class="md:border space-y-8 border-gray-200 md:shadow-xl rounded-md px-6 md:px-12 pt-8 pb-12 w-full max-w-[27rem]"
      >
        <div class="space-y-1">
          <h2 class="text-xl font-semibold text-gray-800">Create your Account</h2>
          <p class="text-gray-600 text-sm">It's quick and easy.</p>
        </div>

        <form @submit.prevent="submit" class="grid gap-y-4">
          <div>
            <Input @input="clearError('username')" label="Username" v-model="username" />
            <InputError v-if="errors.username" :message="errors.username" />
          </div>
          <div>
            <Input
              type="password"
              @input="clearError('password')"
              label="Password"
              v-model="password"
            />
            <InputError v-if="errors.password" :message="errors.password" />
          </div>
          <button
            :disabled="isLoading"
            class="py-2 grid place-items-center hover:bg-gray-800 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all bg-gray-950 text-white font-semibold rounded-sm mt-4"
          >
            <LoaderCircle class="animate-spin" v-if="isLoading" />
            <span v-else> Sign up </span>
          </button>
        </form>
        <p class="text-center text-sm text-gray-600">
          Already have an account?
          <RouterLink to="/sign-in" class="font-semibold text-gray-950 hover:underline ml-0.5"
            >Sign in</RouterLink
          >
        </p>
      </div>
    </section>
  </main>
</template>
