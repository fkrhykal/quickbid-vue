import './assets/css/main.css'

import { createPinia } from 'pinia'
import { createApp, type Directive, type GlobalDirectives } from 'vue'

import App from './App.vue'
import type { MaybePromise } from './hooks/form'
import { isNode } from './lib/guard'
import router from './router'

declare module 'vue' {
  export interface GlobalDirectives {
    vClickOutside: Directive<
      Node & { _listener?: (event: MouseEvent) => MaybePromise<void> },
      (event: MouseEvent) => MaybePromise<void>,
      string
    >
  }
}

const app = createApp(App)

app.directive('click-outside', {
  beforeMount(el, binding) {
    const listener = async (event: MouseEvent) => {
      if (typeof binding.value !== 'function') {
        return
      }
      if (!isNode(event.target)) {
        return
      }
      if (el.contains(event.target)) {
        return
      }
      await binding.value(event)
    }
    el._listener = listener
    window.addEventListener('click', listener)
  },
  unmounted(el) {
    if (typeof el._listener === 'function') {
      window.removeEventListener('click', el._listener)
    }
  },
} satisfies GlobalDirectives['vClickOutside'])

app.use(createPinia())
app.use(router)

app.mount('#app')
