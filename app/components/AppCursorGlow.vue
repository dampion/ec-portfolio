<script setup lang="ts">
const TRAIL_LENGTH = 7

const { experienceStarted } = useHeroExperience()

const enabled = ref(false)
const visible = ref(false)
const dots = ref(
  Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 })),
)

const dotConfig = [
  { size: 18, opacity: 0.55, blur: 6 },
  { size: 14, opacity: 0.42, blur: 5 },
  { size: 12, opacity: 0.34, blur: 4 },
  { size: 10, opacity: 0.28, blur: 4 },
  { size: 8, opacity: 0.22, blur: 3 },
  { size: 6, opacity: 0.16, blur: 2 },
  { size: 4, opacity: 0.1, blur: 2 },
]

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches

  if (prefersReducedMotion || !hasFinePointer) return

  let frameId = 0
  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2

  const onMove = (event: MouseEvent) => {
    mouseX = event.clientX
    mouseY = event.clientY
    visible.value = true
  }

  const onLeave = () => {
    visible.value = false
  }

  const animate = () => {
    const positions = dots.value
    const head = positions[0]
    if (!head) return

    head.x = lerp(head.x, mouseX, 0.28)
    head.y = lerp(head.y, mouseY, 0.28)

    for (let i = 1; i < positions.length; i++) {
      const current = positions[i]
      const previous = positions[i - 1]
      if (!current || !previous) continue

      current.x = lerp(current.x, previous.x, 0.22)
      current.y = lerp(current.y, previous.y, 0.22)
    }

    frameId = requestAnimationFrame(animate)
  }

  function startCursorGlow() {
    if (enabled.value) return

    enabled.value = true
    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    frameId = requestAnimationFrame(animate)
  }

  watch(experienceStarted, (started) => {
    if (started) startCursorGlow()
  }, { immediate: true })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMove)
    document.documentElement.removeEventListener('mouseleave', onLeave)
    cancelAnimationFrame(frameId)
  })
})
</script>

<template>
  <div
    v-if="enabled"
    class="no-print pointer-events-none fixed inset-0 z-0 overflow-hidden"
    aria-hidden="true"
  >
    <div
      v-for="(dot, index) in dots"
      :key="index"
      class="cursor-glow-dot absolute rounded-full transition-opacity duration-300"
      :class="index % 2 === 0 ? 'cursor-glow-dot-indigo' : 'cursor-glow-dot-violet'"
      :style="{
        width: `${dotConfig[index]?.size ?? 8}px`,
        height: `${dotConfig[index]?.size ?? 8}px`,
        opacity: visible ? (dotConfig[index]?.opacity ?? 0.2) : 0,
        filter: `blur(${dotConfig[index]?.blur ?? 3}px)`,
        transform: `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`,
      }"
    />
  </div>
</template>
