<template>
  <div class="flex flex-col items-center justify-center py-12 text-gray-400">
    <InboxIcon class="w-16 h-16 mb-3 opacity-50" />
    <p class="text-sm">暂无记录</p>
    <p class="text-xs mt-1">点击右下角按钮记一笔</p>
  </div>
</template>

<script setup lang="ts">
import { Inbox as InboxIcon } from 'lucide-vue-next'
</script>
