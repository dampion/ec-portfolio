<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('meta.title'),
  meta: [
    { name: 'description', content: () => t('meta.description') },
  ],
})
</script>

<template>
  <div class="relative min-h-screen">
    <AppBackground />
    <AppIntroSpotlight />
    <AppCursorGlow />
    <AppHeader />
    <main class="relative">
      <HeroSection />
      <ExperienceSection />
      <CompetenciesSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
    </main>
  </div>
</template>
