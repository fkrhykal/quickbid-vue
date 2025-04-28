<script setup lang="ts">
import ErrorField from '@/components/ErrorField.vue'
import LoaderCircle from '@/components/icons/LoaderCircleIcon.vue'
import InputField from '@/components/InputField.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { signIn } from '@/handler/form/sign-in'
import { useForm } from '@/hooks/form'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const { username, password, isLoading, submit, errors, setError } = useForm(
  { username: '', password: '' },
  {
    handler: signIn,
    onFailure(result) {
      if (result.code === 401) {
        setError('auth', 'Incorrect username or password')
        return
      }
    },
    onSuccess(result) {
      auth.setToken(result.data.bearerToken)
      router.push('/')
    },
  },
)
</script>

<template>
  <AuthLayout>
    <div
      class="md:border space-y-6 border-gray-200 md:shadow-xl rounded-md px-6 md:px-12 pt-8 pb-12 w-full max-w-[27rem]"
    >
      <div class="space-y-1">
        <h2 class="text-xl font-semibold text-gray-800">Login to your Account</h2>
        <p class="text-gray-600 text-sm">Find deals you can trust.</p>
      </div>

      <form @submit.prevent="submit" class="grid gap-y-4">
        <ErrorField v-if="errors.auth" :message="errors.auth" />
        <div>
          <InputField label="Username" v-model="username" />
        </div>
        <div>
          <InputField type="password" label="Password" v-model="password" />
        </div>
        <button
          :disabled="isLoading"
          class="py-2 grid place-items-center hover:bg-gray-800 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all bg-gray-950 text-white font-semibold rounded-sm mt-4"
        >
          <LoaderCircle class="animate-spin" v-if="isLoading" />
          <span v-else> Sign in </span>
        </button>
      </form>
      <p class="text-center text-sm text-gray-600">
        Doesn't have an account?
        <RouterLink to="/sign-up" class="font-semibold text-gray-950 hover:underline ml-0.5"
          >Sign up</RouterLink
        >
      </p>
    </div>
  </AuthLayout>
</template>
