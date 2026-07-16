import type { Ref } from 'vue'
import type { PageViewResponse } from '~~/shared/types/page-view'

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()
  const count = useState<number | null>('page-view-count', () => null)

  if (import.meta.client && !route.path.startsWith('/print')) {
    nuxtApp.hook('app:mounted', async () => {
      try {
        const response = await $fetch<PageViewResponse>('/api/page-view', {
          method: 'POST',
        })
        count.value = response.count
      }
      catch {
        count.value = null
      }
    })
  }

  return {
    provide: {
      pageView: {
        count: readonly(count),
      },
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $pageView: {
      count: Readonly<Ref<number | null>>
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $pageView: {
      count: Readonly<Ref<number | null>>
    }
  }
}

export {}
