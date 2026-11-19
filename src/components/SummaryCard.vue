<template>
  <div class="grid grid-cols-3 gap-3">
    <div class="bg-emerald-50 rounded-xl p-4 text-center">
      <p class="text-xs text-emerald-600 mb-1">总收入</p>
      <p class="text-lg font-bold text-emerald-700 truncate">
        +{{ formatAmount(income) }}
      </p>
    </div>
    <div class="bg-rose-50 rounded-xl p-4 text-center">
      <p class="text-xs text-rose-600 mb-1">总支出</p>
      <p class="text-lg font-bold text-rose-700 truncate">
        -{{ formatAmount(expense) }}
      </p>
    </div>
    <div class="bg-blue-50 rounded-xl p-4 text-center">
      <p class="text-xs text-blue-600 mb-1">结余</p>
      <p
        class="text-lg font-bold truncate"
        :class="balance >= 0 ? 'text-blue-700' : 'text-rose-700'"
      >
        {{ balance >= 0 ? '+' : '' }}{{ formatAmount(balance) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  income: number
  expense: number
  balance: number
}>()

function formatAmount(n: number) {
  return n.toFixed(2)
}
</script>
