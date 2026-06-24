<script setup lang="ts">
defineProps<{
  title: string
  highlights: string[]
}>()
</script>

<template>
  <article
    class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
  >
    <h3 class="text-base font-semibold text-slate-900 dark:text-white">
      {{ title }}
    </h3>

    <ul class="mt-4 space-y-2">
      <li
        v-for="(item, index) in highlights"
        :key="index"
        class="flex gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
      >
        <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
        <span>{{ item }}</span>
      </li>
    </ul>
  </article>
</template>
