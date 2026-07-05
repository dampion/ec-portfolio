<script setup lang="ts">
const { t } = useI18n()
const { experience } = useResume()
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
