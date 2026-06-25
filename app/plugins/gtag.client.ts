declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const {
    public: { gtagId },
  } = useRuntimeConfig()

  if (!gtagId || import.meta.dev) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // Must push `arguments` object, not a rest array — GA reads this format.
    window.dataLayer.push(arguments)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`
  script.onload = () => {
    window.gtag('js', new Date())
    window.gtag('config', gtagId)
  }
  document.head.appendChild(script)
})
