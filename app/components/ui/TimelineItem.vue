<script setup lang="ts">
defineProps<{
  company: string
  role: string
  period: string
  highlights: string[]
}>()
</script>

<template>
  <div class="relative pl-8">
    <div class="absolute left-0 top-2 h-full w-px bg-slate-200 dark:bg-slate-700" />
    <div
      class="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-indigo-500 bg-white dark:bg-slate-950"
    />

    <div
      class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            {{ role }}
          </h3>
          <p class="text-indigo-600 dark:text-indigo-400">
            {{ company }}
          </p>
        </div>
        <time class="shrink-0 text-sm text-slate-500 dark:text-slate-400">
          {{ period }}
        </time>
      </div>

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
    </div>
  </div>
</template>
