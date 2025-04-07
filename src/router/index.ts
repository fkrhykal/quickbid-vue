import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/sign-up',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/sign-in',
      component: () => import('../views/SignInView.vue'),
    },
  ],
})

export default router
