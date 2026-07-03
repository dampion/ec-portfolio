const AUDIO_SRC = '/audio/output.mp3'

export function useHeroExperience() {
  const experienceStarted = useState('hero-experience-started', () => false)
  const audioEnabled = useState('hero-audio-enabled', () => false)

  let audioElement: HTMLAudioElement | null = null

  async function startExperience() {
    if (experienceStarted.value) return

    try {
      audioElement = new Audio(AUDIO_SRC)
      audioElement.loop = true
      audioElement.volume = 1
      await audioElement.play()
      audioEnabled.value = true
    }
    catch {
      audioEnabled.value = false
    }

    experienceStarted.value = true
  }

  function resetExperience() {
    stopExperience()
    experienceStarted.value = false
  }

  function stopExperience() {
    if (audioElement) {
      audioElement.pause()
      audioElement.src = ''
      audioElement = null
    }

    audioEnabled.value = false
  }

  return {
    experienceStarted,
    audioEnabled,
    startExperience,
    resetExperience,
    stopExperience,
  }
}
