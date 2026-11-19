<template>
  <div
    class="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm"
  >
    <div
      class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
      :class="item.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'"
    >
      <component :is="iconMap[item.category] || CircleIcon" class="w-5 h-5" />
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-800 truncate">
          {{ categoryName }}
        </span>
        <span
          class="text-sm font-bold"
          :class="item.type === 'income' ? 'text-emerald-600' : 'text-rose-600'"
        >
          {{ item.type === 'income' ? '+' : '-' }}{{ item.amount.toFixed(2) }}
        </span>
      </div>
      <div class="flex items-center justify-between mt-0.5">
        <span class="text-xs text-gray-400 truncate">{{ item.remark || '无备注' }}</span>
        <span class="text-xs text-gray-400">{{ item.date }}</span>
      </div>
    </div>
    <button
      class="p-2 text-gray-400 hover:text-rose-500 transition-colors shrink-0"
      aria-label="删除"
      @click="$emit('delete')"
    >
      <Trash2Icon class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  UtensilsCrossed, Bus, ShoppingBag, Gamepad2, HeartPulse,
  MoreHorizontal, Banknote, Briefcase, TrendingUp, Circle,
  Trash2 as Trash2Icon,
} from 'lucide-vue-next'
import { computed } from 'vue'
import type { RecordItem } from '../types'
import { ALL_CATEGORIES } from '../types'

const props = defineProps<{
  item: RecordItem
}>()

defineEmits<{
  delete: []
}>()

const iconMap: Record<string, any> = {
  food: UtensilsCrossed,
  transport: Bus,
  shopping: ShoppingBag,
  entertainment: Gamepad2,
  medical: HeartPulse,
  other_expense: MoreHorizontal,
  salary: Banknote,
  parttime: Briefcase,
  investment: TrendingUp,
  other_income: MoreHorizontal,
}

const CircleIcon = Circle

const categoryName = computed(() => {
  const cat = ALL_CATEGORIES.find((c) => c.id === props.item.category)
  return cat?.name || props.item.category
})
</script>
