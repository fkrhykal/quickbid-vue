<script setup lang="ts">
import ErrorField from '@/components/ErrorField.vue'
import LoaderCircleIcon from '@/components/icons/LoaderCircleIcon.vue'
import InputField from '@/components/InputField.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { signUp } from '@/handler/form/sign-up'
import { useForm } from '@/hooks/form'
import { useToast } from '@/hooks/toast'
import { isTypeError } from '@/utils/guard'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()

const { username, password, isLoading, errors, submit, setError, clearError } = useForm(
  {
    username: '',
    password: '',
  },
  {
    handler: signUp,
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
      class="md:border space-y-8 border-gray-200 md:shadow-xl rounded-md px-6 md:px-12 pt-8 pb-12 w-full max-w-[27rem]"
    >
      <div class="space-y-1">
        <h2 class="text-xl font-semibold text-gray-800">Create your Account</h2>
        <p class="text-gray-600 text-sm">It's quick and easy.</p>
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
          class="py-2 grid place-items-center hover:bg-gray-800 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all bg-gray-950 text-white font-semibold rounded-sm mt-4"
        >
          <LoaderCircleIcon class="animate-spin" v-if="isLoading" />
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
  </AuthLayout>
</template>
