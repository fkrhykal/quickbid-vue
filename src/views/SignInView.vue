<script setup lang="ts">
import ErrorField from '@/components/ErrorField.vue'
import LoaderCircle from '@/components/icons/LoaderCircleIcon.vue'
import UpsideIcon from '@/components/icons/QuickbidIcon.vue'
import InputField from '@/components/InputField.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { createAccessToken } from '@/data/form/sign-in'
import { useForm } from '@/hooks/form'
import { useToast } from '@/hooks/toast'
import { isTypeError } from '@/lib/guard'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const { username, password, isLoading, submit, errors, setError } = useForm(
  { username: '', password: '' },
  {
    formFn: createAccessToken,
    onFailure({ code, error }) {
      if (code === 401) {
        setError('auth', 'Incorrect username or password')
        return
      }
      if (code === 0 && isTypeError(error)) {
        toast.error(error.message)
      }
    },
    onSuccess({ data: { accessToken, refreshToken } }) {
      auth.init({
        accessToken,
        refreshToken,
      })
      router.push('/')
    },
  },
)
</script>

<template>
  <AuthLayout>
    <div
      class="md:border space-y-6 border-gray-200 md:shadow-xl rounded-md px-6 md:px-12 pt-8 pb-12 w-full max-w-[28rem]"
    >
      <div class="space-y-1 flex gap-x-4">
        <RouterLink class="lg:hidden" to="/">
          <UpsideIcon class="w-12 h-min" />
        </RouterLink>
        <div class="mt-auto">
          <h2 class="text-2xl font-semibold text-gray-800">Login to your Account</h2>
          <p class="text-gray-600">Find deals you can trust.</p>
        </div>
      </div>

      <form @submit.prevent="submit" class="grid gap-y-4">
        <ErrorField v-if="errors.auth" :message="errors.auth" />
        <InputField label="Username" v-model="username" />
        <InputField type="password" label="Password" v-model="password" />
        <button
          :disabled="isLoading"
          class="py-3 grid place-items-center hover:bg-gray-800 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all bg-gray-950 text-white font-semibold rounded-sm mt-4"
        >
          <LoaderCircle class="animate-spin" v-if="isLoading" />
          <span v-else> Sign in </span>
        </button>
      </form>
      <p class="text-center text-gray-600">
        Doesn't have an account?
        <RouterLink to="/sign-up" class="font-semibold text-gray-950 hover:underline ml-0.5"
          >Sign up</RouterLink
        >
      </p>
    </div>
  </AuthLayout>
</template>
