<script setup lang="ts">
const { t } = useI18n()
const { experienceStarted, startExperience } = useHeroExperience()

async function handleEnable() {
  await startExperience()
}
</script>

<template>
  <Transition name="hero-audio-prompt">
    <div
      v-if="!experienceStarted"
      class="hero-audio-prompt no-print"
      role="dialog"
      aria-modal="true"
      :aria-label="t('audio.title')"
    >
      <div class="hero-audio-prompt-backdrop" aria-hidden="true" />

      <div class="hero-audio-prompt-card">
        <div class="hero-audio-prompt-copy">
          <p class="hero-audio-prompt-title">
            {{ t('audio.title') }}
          </p>
          <p class="hero-audio-prompt-desc">
            {{ t('audio.description') }}
          </p>
        </div>

        <button
          type="button"
          class="hero-audio-prompt-btn"
          @click="handleEnable"
        >
          {{ t('audio.enable') }}
        </button>
      </div>
    </div>
  </Transition>
</template>
