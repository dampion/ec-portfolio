<script setup lang="ts">
const { t } = useI18n()
const { competencies } = useResume()
const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section
    id="competencies"
    ref="target"
    class="section-container"
    :class="['reveal', { 'reveal-visible': isVisible }]"
  >
    <UiSectionTitle :title="t('sections.competencies')" />

    <div class="space-y-4">
      <UiCompetencyCard
        v-for="(item, index) in competencies"
        :key="index"
        :title="item.title"
        :highlights="item.highlights"
      />
    </div>
  </section>
</template>
