<script setup lang="ts">
const { t } = useI18n()
const { profile } = useResume()

const introReady = ref(false)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    introReady.value = true
    return
  }

  requestAnimationFrame(() => {
    introReady.value = true
  })
})
</script>

<template>
  <section
    id="about"
    class="hero-fiami relative flex min-h-[100svh] flex-col"
    :class="{ 'intro-ready': introReady }"
  >
    <div class="hero-fiami-glow pointer-events-none absolute inset-0" aria-hidden="true" />
    <div class="hero-fiami-grid pointer-events-none absolute inset-0" aria-hidden="true" />

    <div class="section-container relative z-10 flex flex-1 flex-col justify-center pb-28 pt-28 md:pb-32 md:pt-32">
      <p class="intro-fade intro-fade-1 hero-eyebrow mb-4 text-sm font-medium tracking-[0.2em] text-[#A4DEFF]">
        {{ profile.title }}
      </p>

      <h1 class="intro-fade intro-fade-2 hero-title font-serif text-4xl font-semibold leading-tight text-[#F9FEFF] md:text-6xl">
        <span class="hero-name-glow">{{ profile.name }}</span>
      </h1>

      <p class="intro-fade intro-fade-3 mt-6 max-w-2xl text-base leading-relaxed text-[#F9FEFF]/75 md:text-lg">
        {{ profile.summary }}
      </p>

      <div class="intro-fade intro-fade-4 mt-10 flex flex-wrap gap-4">
        <a
          href="#contact"
          class="hero-btn hero-btn-primary"
        >
          {{ t('hero.contactMe') }}
        </a>
        <a
          href="#experience"
          class="hero-btn hero-btn-outline"
        >
          {{ t('hero.viewExperience') }}
        </a>
      </div>
    </div>

    <a
      href="#experience"
      class="hero-scroll no-print intro-fade intro-fade-5"
      :aria-label="t('hero.scroll')"
    >
      <span class="hero-scroll-label">{{ t('hero.scroll') }}</span>
      <span class="hero-scroll-line" />
    </a>
  </section>
</template>
