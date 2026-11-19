<template>
  <header class="bg-primary text-white shadow">
    <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
      <h1 class="text-lg font-bold">个人记账</h1>
      <span class="text-sm opacity-90">{{ today }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
const today = new Date().toLocaleDateString('zh-CN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>
