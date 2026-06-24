<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="mb-8">
    <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
      {{ title }}
    </h2>
    <div class="mt-3 h-1 w-12 rounded-full bg-indigo-500" />
  </div>
</template>
