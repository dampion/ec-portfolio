<script setup lang="ts">
const { t } = useI18n()
const { resetExperience, stopExperience } = useHeroExperience()

useHead({
  title: () => t('meta.title'),
  meta: [
    { name: 'description', content: () => t('meta.description') },
  ],
})

onMounted(() => {
  resetExperience()
  if (import.meta.client) {
    localStorage.removeItem('ec-portfolio-audio-consent')
  }
})

onBeforeUnmount(() => {
  stopExperience()
})
</script>

<template>
  <div class="relative min-h-screen">
    <AppBackground />
    <AppIntroSpotlight />
    <AppCursorGlow />
    <AppHeader />
    <HeroAudioPrompt />
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
