/**
 * Visit session plugin (example)
 *
 * Compared to gtag.client.ts:
 * - gtag: side-effect only (injects GA script, no app API)
 * - visit-session: uses `provide` so components can read data via useNuxtApp()
 *
 * Nuxt auto-loads files in app/plugins/. No manual import in pages or nuxt.config.
 * The `.client.ts` suffix means this runs in the browser only.
 */
const STORAGE_KEY = 'ec-portfolio-session-visits'

export default defineNuxtPlugin(() => {
  let visitCount = 1

  if (import.meta.client) {
    const previous = Number(sessionStorage.getItem(STORAGE_KEY) ?? 0)
    visitCount = previous + 1
    sessionStorage.setItem(STORAGE_KEY, String(visitCount))
  }

  return {
    provide: {
      visitSession: {
        count: visitCount,
      },
    },
  }
})

declare module '#app' {
  interface NuxtApp {
    $visitSession: {
      count: number
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $visitSession: {
      count: number
    }
  }
}

export {}
