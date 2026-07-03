<script setup lang="ts">
const { t } = useI18n()
const { experience, experienceFocus } = useResume()
const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section
    id="experience"
    ref="target"
    class="section-container"
    :class="['reveal', { 'reveal-visible': isVisible }]"
  >
    <UiSectionTitle :title="t('sections.experience')" />

    <div
      v-if="experienceFocus.length"
      class="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <ul class="space-y-2">
        <li
          v-for="(item, index) in experienceFocus"
          :key="index"
          class="flex gap-2 text-sm leading-relaxed"
        >
          <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
          <span>
            <span class="font-medium text-slate-900 dark:text-white">{{ item.title }}</span>
            <span class="text-slate-600 dark:text-slate-300"> — {{ item.description }}</span>
          </span>
        </li>
      </ul>
    </div>

    <div class="space-y-8">
      <UiTimelineItem
        v-for="(item, index) in experience"
        :key="index"
        :company="item.company"
        :role="item.role"
        :period="item.period"
        :highlights="item.highlights"
      />
    </div>
  </section>
</template>
