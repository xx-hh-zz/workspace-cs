<template>
  <div class="p-4 space-y-4">
    <SummaryCard
      :income="store.totalIncome"
      :expense="store.totalExpense"
      :balance="store.balance"
    />

    <CategoryChart :stats="store.categoryStats" />

    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-gray-700">最近记录</h3>
        <router-link
          to="/records"
          class="text-xs text-primary hover:underline"
        >
          查看全部
        </router-link>
      </div>
      <RecordList
        v-if="recentRecords.length > 0"
        :records="recentRecords"
        @delete="onDelete"
      />
      <EmptyState v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRecordStore } from '../stores/record'
import SummaryCard from '../components/SummaryCard.vue'
import CategoryChart from '../components/CategoryChart.vue'
import RecordList from '../components/RecordList.vue'
import EmptyState from '../components/EmptyState.vue'

const store = useRecordStore()
const showToast = inject<(msg: string) => void>('showToast', () => {})

const recentRecords = computed(() => store.filteredRecords.slice(0, 5))

function onDelete(id: string) {
  if (confirm('确定删除这条记录吗？')) {
    store.deleteRecord(id)
    showToast('已删除')
  }
}
</script>
