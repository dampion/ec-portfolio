<script setup lang="ts">
const { t, locale } = useI18n()
const { profile } = useResume()
const { target, isVisible } = useScrollReveal()
const { $pageView } = useNuxtApp()
const phoneHref = computed(() => `tel:${profile.value.phone.replace(/^0/, '+886').replaceAll('-', '')}`)

const formattedPageViews = computed(() => {
  if ($pageView.count.value === null) return null

  return new Intl.NumberFormat(locale.value === 'zh' ? 'zh-TW' : 'en-US')
    .format($pageView.count.value)
})
</script>

<template>
  <section
    id="contact"
    ref="target"
    class="section-container pb-24"
    :class="['reveal', { 'reveal-visible': isVisible }]"
  >
    <UiSectionTitle :title="t('sections.contact')" />

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
          {{ t('contact.email') }}
        </p>
        <a
          :href="`mailto:${profile.email}`"
          class="mt-1 block text-lg font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          {{ profile.email }}
        </a>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
          {{ t('contact.phone') }}
        </p>
        <a
          :href="phoneHref"
          class="mt-1 block text-lg font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          {{ profile.phone }}
        </a>
      </div>

      <div
        v-if="formattedPageViews !== null"
        class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
      >
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
          {{ t('contact.pageViews') }}
        </p>
        <p class="mt-1 text-lg font-medium text-slate-900 dark:text-white">
          {{ formattedPageViews }}
        </p>
      </div>
    </div>

    <div class="mt-6">
      <p class="mb-3 text-sm font-medium text-slate-500 dark:text-slate-400">
        {{ t('contact.links') }}
      </p>
      <div class="flex flex-wrap gap-3">
        <a
          v-for="link in profile.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </section>
</template>
