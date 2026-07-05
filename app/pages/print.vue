<script setup lang="ts">
import type { Locale } from '~~/data/resume'
import enMessages from '~~/i18n/locales/en.json'
import zhMessages from '~~/i18n/locales/zh.json'

const route = useRoute()

definePageMeta({
  layout: false,
})

const printLocale = computed<Locale>(() => (
  route.query.lang === 'en' ? 'en' : 'zh'
))

const localeMessages = { zh: zhMessages, en: enMessages } as const

function resolveLocaleMessage(message: unknown): string | undefined {
  if (typeof message === 'string') {
    return message
  }

  if (message && typeof message === 'object' && 'b' in message) {
    const compiled = message as { b?: { s?: string } }
    return compiled.b?.s
  }

  return undefined
}

function printText(key: string) {
  const value = key.split('.').reduce<unknown>((message, part) => {
    if (message && typeof message === 'object') {
      return (message as Record<string, unknown>)[part]
    }
    return undefined
  }, localeMessages[printLocale.value] as unknown)

  return resolveLocaleMessage(value) ?? key
}

const { profile, experience, skills, education } = useResume(printLocale)

useHead({
  title: () => `${profile.value.name} - ${printText('print.documentTitle')}`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600&family=Noto+Serif+TC:wght@500;600&display=swap' }],
})

onMounted(() => {
  if (route.query.auto === '1') {
    nextTick(() => window.print())
  }
})

function handlePrint() {
  window.print()
}
</script>

<template>
  <div class="min-h-screen">
    <div class="print-toolbar px-6">
      <NuxtLink to="/" class="print-toolbar-link">
        {{ printText('print.backToSite') }}
      </NuxtLink>
      <button type="button" class="print-toolbar-btn" @click="handlePrint">
        {{ printText('print.downloadPdf') }}
      </button>
    </div>

    <article class="print-resume-page">
      <header class="print-section">
        <h1 class="print-name">
          {{ profile.name }}
        </h1>
        <p class="print-title">
          {{ profile.title }}
        </p>
        <div class="print-contact">
          <span>{{ profile.email }}</span>
        </div>
      </header>

      <section class="print-section mt-6">
        <h2 class="print-heading">
          {{ printText('print.summary') }}
        </h2>
        <p class="print-summary">
          {{ profile.summary }}
        </p>
      </section>

      <section class="print-section mt-6">
        <h2 class="print-heading">
          {{ printText('sections.experience') }}
        </h2>
        <div class="space-y-5">
          <div
            v-for="(item, index) in experience"
            :key="index"
          >
            <div class="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="print-item-title">
                  {{ item.role }}
                </p>
                <p class="print-item-meta">
                  {{ item.company }}
                </p>
              </div>
              <p class="print-item-meta shrink-0">
                {{ item.period }}
              </p>
            </div>
            <ul class="print-list">
              <li
                v-for="(highlight, highlightIndex) in item.highlights"
                :key="highlightIndex"
              >
                {{ highlight }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="print-section mt-6">
        <h2 class="print-heading">
          {{ printText('sections.skills') }}
        </h2>
        <div class="print-skills">
          <span
            v-for="skill in skills"
            :key="skill.name"
            class="print-skill"
          >
            {{ skill.name }}
          </span>
        </div>
      </section>

      <section class="print-section mt-6">
        <h2 class="print-heading">
          {{ printText('sections.education') }}
        </h2>
        <div
          v-for="(item, index) in education"
          :key="index"
          class="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <p class="print-item-title">
              {{ item.school }}
            </p>
            <p class="print-item-meta">
              {{ item.degree }}
            </p>
          </div>
          <p
            v-if="item.period"
            class="print-item-meta shrink-0"
          >
            {{ item.period }}
          </p>
        </div>
      </section>
    </article>
  </div>
</template>

<style src="~/assets/css/print-resume.css"></style>
