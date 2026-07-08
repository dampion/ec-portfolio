<script setup lang="ts">
const { t, locale, setLocale } = useI18n()
const colorMode = useColorMode()
const { profile } = useResume()

const navItems = [
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'competencies', href: '#competencies' },
  { key: 'skills', href: '#skills' },
  { key: 'education', href: '#education' },
  { key: 'contact', href: '#contact' },
] as const

const isScrolled = ref(false)
const isOverHero = ref(true)
const isMobileMenuOpen = ref(false)

const useLightHeader = computed(() => isOverHero.value && !isScrolled.value)
const isDarkMode = computed(() => colorMode.value === 'dark')

function toggleLocale() {
  setLocale(locale.value === 'zh' ? 'en' : 'zh')
}

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

onMounted(() => {
  const onScroll = () => {
    isScrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  const hero = document.getElementById('about')
  if (!hero) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      isOverHero.value = entry?.isIntersecting ?? false
    },
    { threshold: 0.35 },
  )
  observer.observe(hero)
  onUnmounted(() => observer.disconnect())
})

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="no-print sticky top-0 z-50 transition-all duration-300"
    :class="[
      useLightHeader ? (isDarkMode ? 'header-on-hero-dark' : 'header-on-hero-light') : '',
      isScrolled
        ? 'border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80'
        : 'bg-transparent',
    ]"
  >
    <div class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
      <a
        href="#"
        class="header-brand font-serif text-base font-semibold tracking-[0.18em] transition-colors"
      >
        {{ profile.brand }}
      </a>

      <nav class="hidden items-center gap-6 md:flex">
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="item.href"
          class="header-link text-sm transition-colors"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="header-btn rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors"
          :aria-label="locale === 'zh' ? 'Switch to English' : '切換至中文'"
          @click="toggleLocale"
        >
          {{ locale === 'zh' ? 'EN' : '中' }}
        </button>

        <button
          type="button"
          class="header-btn rounded-lg p-2 transition-colors"
          :aria-label="colorMode.value === 'dark' ? t('theme.light') : t('theme.dark')"
          @click="toggleTheme"
        >
          <svg
            v-if="colorMode.value === 'dark'"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        <button
          type="button"
          class="header-btn rounded-lg p-2 transition-colors md:hidden"
          aria-label="Toggle menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <nav
      v-if="isMobileMenuOpen"
      class="border-t px-6 py-4 md:hidden"
      :class="useLightHeader && !isScrolled
        ? isDarkMode
          ? 'border-[#A4DEFF]/20 bg-[#02030C]/95 backdrop-blur-md'
          : 'border-slate-300/70 bg-white/90 backdrop-blur-md'
        : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'"
    >
      <a
        v-for="item in navItems"
        :key="item.key"
        :href="item.href"
        class="header-link block py-2 text-sm"
        @click="closeMobileMenu"
      >
        {{ t(`nav.${item.key}`) }}
      </a>
    </nav>
  </header>
</template>
