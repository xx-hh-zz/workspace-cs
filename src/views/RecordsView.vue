<template>
  <div class="p-4 space-y-4">
    <div class="bg-white rounded-xl p-3 shadow-sm border border-gray-100 space-y-2">
      <div class="flex gap-2">
        <select
          v-model="localType"
          class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">全部类型</option>
          <option value="income">收入</option>
          <option value="expense">支出</option>
        </select>
        <select
          v-model="localCategory"
          class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">全部分类</option>
          <option
            v-for="cat in availableCategories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>
        <select
          v-model="localDateRange"
          class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="thisMonth">本月</option>
          <option value="lastMonth">上月</option>
          <option value="all">全部</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-gray-700">
          账目明细
          <span class="text-xs font-normal text-gray-400 ml-1"
            >({{ store.filteredRecords.length }} 条)</span
          >
        </h3>
      </div>
      <RecordList
        v-if="store.filteredRecords.length > 0"
        :records="store.filteredRecords"
        @delete="onDelete"
      />
      <EmptyState v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRecordStore } from '../stores/record'
import { ALL_CATEGORIES } from '../types'
import RecordList from '../components/RecordList.vue'
import EmptyState from '../components/EmptyState.vue'
import type { RecordType } from '../types'

const store = useRecordStore()

const localType = ref<RecordType | 'all'>(store.filterType)
const localCategory = ref<string>(store.filterCategory)
const localDateRange = ref<'thisMonth' | 'lastMonth' | 'all'>(store.filterDateRange)

watch([localType, localCategory, localDateRange], () => {
  store.setFilter(localType.value, localCategory.value, localDateRange.value)
})

const availableCategories = computed(() => {
  if (localType.value === 'all') return ALL_CATEGORIES
  return ALL_CATEGORIES.filter((c) => c.type === localType.value)
})

function onDelete(id: string) {
  if (confirm('确定删除这条记录吗？')) {
    store.deleteRecord(id)
  }
}
</script>
