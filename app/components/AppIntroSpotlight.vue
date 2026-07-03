<script setup lang="ts">
const { experienceStarted } = useHeroExperience()
const visible = ref(false)

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  watch(experienceStarted, (started) => {
    if (started) visible.value = true
  }, { immediate: true })
})
</script>

<template>
  <div
    v-if="visible"
    class="intro-spotlight no-print pointer-events-none fixed inset-0 z-30"
    aria-hidden="true"
  >
    <div class="intro-spotlight-beam" />
    <div class="intro-spotlight-core" />
  </div>
</template>
