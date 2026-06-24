<script setup lang="ts">
const { t } = useI18n()
const { education } = useResume()
const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section
    id="education"
    ref="target"
    class="section-container"
    :class="['reveal', { 'reveal-visible': isVisible }]"
  >
    <UiSectionTitle :title="t('sections.education')" />

    <div class="space-y-4">
      <article
        v-for="(item, index) in education"
        :key="index"
        class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ item.school }}
            </h3>
            <p class="text-slate-600 dark:text-slate-300">
              {{ item.degree }}
            </p>
          </div>
          <time
            v-if="item.period"
            class="shrink-0 text-sm text-slate-500 dark:text-slate-400"
          >
            {{ item.period }}
          </time>
        </div>
      </article>
    </div>
  </section>
</template>
