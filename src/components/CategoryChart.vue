<template>
  <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
    <h3 class="text-sm font-semibold text-gray-700 mb-3">支出分类占比</h3>
    <div v-if="stats.length === 0" class="text-center text-gray-400 text-sm py-6">
      暂无支出数据
    </div>
    <div v-else class="flex items-center gap-4">
      <div
        class="w-24 h-24 rounded-full shrink-0"
        :style="{ background: conicGradient }"
      />
      <div class="flex-1 space-y-1.5">
        <div
          v-for="s in stats"
          :key="s.category"
          class="flex items-center justify-between text-xs"
        >
          <div class="flex items-center gap-1.5">
            <span
              class="w-2.5 h-2.5 rounded-full"
              :style="{ backgroundColor: colorMap[s.category] || '#9ca3af' }"
            />
            <span class="text-gray-600">{{ categoryName(s.category) }}</span>
          </div>
          <span class="text-gray-500">{{ s.percentage }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ALL_CATEGORIES } from '../types'

const props = defineProps<{
  stats: { category: string; amount: number; percentage: number }[]
}>()

const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7']

const colorMap = computed(() => {
  const map: Record<string, string> = {}
  props.stats.forEach((s, i) => {
    map[s.category] = colors[i % colors.length]
  })
  return map
})

const conicGradient = computed(() => {
  if (props.stats.length === 0) return 'conic-gradient(#e5e7eb 0% 100%)'
  let current = 0
  const segments = props.stats.map((s) => {
    const start = current
    const end = current + s.percentage
    current = end
    return `${colorMap.value[s.category] || '#9ca3af'} ${start}% ${end}%`
  })
  return `conic-gradient(${segments.join(', ')})`
})

function categoryName(id: string) {
  return ALL_CATEGORIES.find((c) => c.id === id)?.name || id
}
</script>
