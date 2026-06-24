<template>
  <div
    class="no-print pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    aria-hidden="true"
  >
    <div class="bg-grid absolute inset-0" />

    <div
      class="bg-blob bg-blob-1 absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-600/20"
    />
    <div
      class="bg-blob bg-blob-2 absolute -right-24 top-1/4 h-[24rem] w-[24rem] rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-600/15"
    />
    <div
      class="bg-blob bg-blob-3 absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-600/10"
    />
  </div>
</template>
