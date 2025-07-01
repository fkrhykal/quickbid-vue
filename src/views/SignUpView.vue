<script setup lang="ts">
import ErrorField from '@/components/ErrorField.vue'
import LoaderCircleIcon from '@/components/icons/LoaderCircleIcon.vue'
import UpsideIcon from '@/components/icons/QuickbidIcon.vue'
import InputField from '@/components/InputField.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { signUp } from '@/handler/form/sign-up'
import { useForm } from '@/hooks/form'
import { useToast } from '@/hooks/toast'
import { isTypeError } from '@/lib/guard'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const { username, password, isLoading, errors, submit, setError, clearError } = useForm(
  {
    username: '',
    password: '',
  },
  {
    formFn: signUp,
    onFailure(result) {
      if (result.code === 409) {
        setError('username', result.error)
      }
      if (result.code === 0 && isTypeError(result.error)) {
        toast.error(result.error.message)
      }
    },
    onSuccess() {
      router.push('/sign-in')
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
          <h2 class="text-2xl font-semibold text-gray-800">Create your Account</h2>
          <p class="text-gray-600">Its quick and easy.</p>
        </div>
      </div>

      <form @submit.prevent="submit" class="grid gap-y-4">
        <div>
          <InputField @input="clearError('username')" label="Username" v-model="username" />
          <ErrorField v-if="errors.username" :message="errors.username" />
        </div>
        <div>
          <InputField
            type="password"
            @input="clearError('password')"
            label="Password"
            v-model="password"
          />
          <ErrorField v-if="errors.password" :message="errors.password" />
        </div>
        <button
          :disabled="isLoading"
          class="py-3 grid place-items-center hover:bg-gray-800 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all bg-gray-950 text-white font-semibold rounded-sm mt-4"
        >
          <LoaderCircleIcon class="animate-spin" v-if="isLoading" />
          <span v-else> Sign up </span>
        </button>
      </form>
      <p class="text-center text-gray-600">
        Already have an account?
        <RouterLink to="/sign-in" class="font-semibold text-gray-950 hover:underline ml-0.5"
          >Sign in</RouterLink
        >
      </p>
    </div>
  </AuthLayout>
</template>
