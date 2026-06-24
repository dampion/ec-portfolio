<script setup lang="ts">
const { t } = useI18n()
const { skills } = useResume()
const { target, isVisible } = useScrollReveal()
</script>

<template>
  <section
    id="skills"
    ref="target"
    class="section-container"
    :class="['reveal', { 'reveal-visible': isVisible }]"
  >
    <UiSectionTitle :title="t('sections.skills')" />

    <div class="flex flex-wrap gap-3">
      <UiSkillTag
        v-for="skill in skills"
        :key="skill.name"
        :name="skill.name"
        :level="skill.level"
      />
    </div>
  </section>
</template>
