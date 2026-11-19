<template>
  <div
    class="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-5 shadow-xl animate-slide-up"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-gray-800">记一笔</h2>
        <button
          class="p-1 text-gray-400 hover:text-gray-600"
          aria-label="关闭"
          @click="$emit('close')"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>

      <div class="flex gap-2 mb-4">
        <button
          class="flex-1 py-2 rounded-lg text-sm font-medium border transition-colors"
          :class="
            form.type === 'expense'
              ? 'bg-rose-500 text-white border-rose-500'
              : 'bg-white text-gray-600 border-gray-200'
          "
          @click="form.type = 'expense'"
        >
          支出
        </button>
        <button
          class="flex-1 py-2 rounded-lg text-sm font-medium border transition-colors"
          :class="
            form.type === 'income'
              ? 'bg-emerald-500 text-white border-emerald-500'
              : 'bg-white text-gray-600 border-gray-200'
          "
          @click="form.type = 'income'"
        >
          收入
        </button>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">金额</label>
          <input
            v-model="form.amount"
            type="number"
            inputmode="decimal"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label class="block text-xs text-gray-500 mb-1">分类</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="cat in currentCategories"
              :key="cat.id"
              class="flex flex-col items-center gap-1 py-2 rounded-lg border text-xs transition-colors"
              :class="
                form.category === cat.id
                  ? form.type === 'income'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-rose-50 border-rose-300 text-rose-700'
                  : 'bg-white border-gray-200 text-gray-600'
              "
              @click="form.category = cat.id"
            >
              <component :is="iconMap[cat.icon] || CircleIcon" class="w-4 h-4" />
              <span>{{ cat.name }}</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs text-gray-500 mb-1">日期</label>
          <input
            v-model="form.date"
            type="date"
            class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div>
          <label class="block text-xs text-gray-500 mb-1">备注（可选）</label>
          <input
            v-model="form.remark"
            type="text"
            placeholder="写点什么..."
            class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div class="flex gap-3 mt-5">
        <button
          class="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
          @click="$emit('close')"
        >
          取消
        </button>
        <button
          class="flex-1 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 disabled:opacity-50"
          :disabled="!canSave"
          @click="save"
        >
          保存
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import {
  X as XIcon,
  UtensilsCrossed, Bus, ShoppingBag, Gamepad2, HeartPulse,
  MoreHorizontal, Banknote, Briefcase, TrendingUp, Circle,
} from 'lucide-vue-next'
import { useRecordStore } from '../stores/record'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types'
import type { RecordType } from '../types'

const store = useRecordStore()

const emit = defineEmits<{
  close: []
  saved: []
}>()

const today = new Date().toISOString().slice(0, 10)

const form = reactive({
  type: 'expense' as RecordType,
  amount: '',
  category: '',
  remark: '',
  date: today,
})

const currentCategories = computed(() =>
  form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
)

const canSave = computed(() => {
  const amount = parseFloat(form.amount as string)
  return !!form.category && !isNaN(amount) && amount > 0
})

const iconMap: Record<string, any> = {
  UtensilsCrossed,
  Bus,
  ShoppingBag,
  Gamepad2,
  HeartPulse,
  MoreHorizontal,
  Banknote,
  Briefcase,
  TrendingUp,
}
const CircleIcon = Circle

function save() {
  const amount = parseFloat(form.amount as string)
  if (!form.category || isNaN(amount) || amount <= 0) return
  store.addRecord({
    type: form.type,
    amount,
    category: form.category,
    remark: form.remark.trim(),
    date: form.date,
  })
  emit('saved')
  form.amount = ''
  form.category = ''
  form.remark = ''
  form.date = today
  form.type = 'expense'
}
</script>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
.animate-slide-up {
  animation: slide-up 0.25s ease-out;
}
</style>
