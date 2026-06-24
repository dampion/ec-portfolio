<script setup lang="ts">
defineProps<{
  name: string
  level: number
}>()
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500"
  >
    {{ name }}
    <span class="flex gap-0.5">
      <span
        v-for="i in 5"
        :key="i"
        class="h-1.5 w-1.5 rounded-full transition-colors"
        :class="i <= level ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'"
      />
    </span>
  </span>
</template>
