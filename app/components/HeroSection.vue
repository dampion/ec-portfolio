<script setup lang="ts">
const { t } = useI18n()
const { profile } = useResume()

const introReady = ref(false)
const visibleHudCount = ref(0)

const TAG_REVEAL_START = 1400
const TAG_REVEAL_STEP = 900

const heroHudTags = computed(() => [
  {
    label: t('hero.tagLottery'),
    top: '21%',
    left: '4%',
    rotate: -5,
    floatDuration: 5.6,
  },
  {
    label: t('hero.tagSports'),
    top: '13%',
    right: '2%',
    rotate: 4,
    floatDuration: 6.4,
  },
  {
    label: t('hero.tagApp'),
    top: '54%',
    left: '0%',
    rotate: -3,
    floatDuration: 5.9,
  },
  {
    label: t('hero.tagWeb'),
    bottom: '34%',
    right: '1%',
    rotate: 3,
    floatDuration: 6.8,
  },
  {
    label: t('hero.tagVue'),
    top: '34%',
    right: '7%',
    rotate: -2,
    floatDuration: 6.1,
  },
  {
    label: t('hero.tagFlutter'),
    bottom: '48%',
    left: '3%',
    rotate: 4,
    floatDuration: 5.4,
  },
  {
    label: t('hero.tagCreateJs'),
    top: '68%',
    right: '5%',
    rotate: -4,
    floatDuration: 6.6,
  },
])

let revealTimers: ReturnType<typeof setTimeout>[] = []

function startTagReveal() {
  const total = heroHudTags.value.length

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visibleHudCount.value = total
    return
  }

  for (let index = 0; index < total; index++) {
    revealTimers.push(setTimeout(() => {
      visibleHudCount.value = index + 1
    }, TAG_REVEAL_START + index * TAG_REVEAL_STEP))
  }
}

onMounted(() => {
  requestAnimationFrame(() => {
    introReady.value = true
    startTagReveal()
  })
})

onBeforeUnmount(() => {
  revealTimers.forEach(clearTimeout)
  revealTimers = []
})
</script>

<template>
  <section
    id="about"
    class="hero-cinematic relative flex min-h-[100svh] flex-col"
    :class="{ 'intro-ready': introReady }"
  >
    <div class="hero-cinematic-glow pointer-events-none absolute inset-0" aria-hidden="true" />
    <div class="hero-cinematic-grid pointer-events-none absolute inset-0" aria-hidden="true" />

    <div
      class="hero-hud-tags pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div
        v-for="(tag, index) in heroHudTags"
        :key="tag.label"
        class="hero-hud-tag-shell"
        :class="[
          `hero-hud-tag-shell-${index + 1}`,
          { 'hero-hud-tag-shell-visible': index < visibleHudCount },
        ]"
        :style="{
          top: tag.top,
          left: tag.left,
          right: tag.right,
          bottom: tag.bottom,
          '--tag-rotate': `${tag.rotate}deg`,
          '--float-duration': `${tag.floatDuration}s`,
        }"
      >
        <div class="hero-hud-tag">
          <span class="hero-hud-tag-icon">
            <span class="hero-hud-tag-icon-core" />
          </span>
          <span class="hero-hud-tag-label">{{ tag.label }}</span>
          <span class="hero-hud-tag-bracket hero-hud-tag-bracket-tl" />
          <span class="hero-hud-tag-bracket hero-hud-tag-bracket-tr" />
          <span class="hero-hud-tag-bracket hero-hud-tag-bracket-bl" />
          <span class="hero-hud-tag-bracket hero-hud-tag-bracket-br" />
        </div>
      </div>
    </div>

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
