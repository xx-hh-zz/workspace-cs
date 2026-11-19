import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { RecordItem, RecordType } from '../types'

const STORAGE_KEY = 'accounting_records'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function loadRecords(): RecordItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as RecordItem[]
      return Array.isArray(parsed) ? parsed : []
    }
  } catch {
    // ignore
  }
  return []
}

function saveRecords(records: RecordItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  } catch {
    // ignore
  }
}

export const useRecordStore = defineStore('record', () => {
  const records = ref<RecordItem[]>(loadRecords())
  const filterType = ref<RecordType | 'all'>('all')
  const filterCategory = ref<string>('all')
  const filterDateRange = ref<'thisMonth' | 'lastMonth' | 'all'>('thisMonth')

  watch(records, (val) => saveRecords(val), { deep: true })

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      records.value = loadRecords()
    }
  })

  const filteredRecords = computed(() => {
    let result = [...records.value].sort((a, b) => b.createdAt - a.createdAt)

    if (filterType.value !== 'all') {
      result = result.filter((r) => r.type === filterType.value)
    }

    if (filterCategory.value !== 'all') {
      result = result.filter((r) => r.category === filterCategory.value)
    }

    if (filterDateRange.value !== 'all') {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth()
      if (filterDateRange.value === 'thisMonth') {
        const start = new Date(year, month, 1)
        const end = new Date(year, month + 1, 0)
        result = result.filter((r) => {
          const d = new Date(r.date)
          return d >= start && d <= end
        })
      } else if (filterDateRange.value === 'lastMonth') {
        const start = new Date(year, month - 1, 1)
        const end = new Date(year, month, 0)
        result = result.filter((r) => {
          const d = new Date(r.date)
          return d >= start && d <= end
        })
      }
    }

    return result
  })

  const totalIncome = computed(() => {
    return filteredRecords.value
      .filter((r) => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0)
  })

  const totalExpense = computed(() => {
    return filteredRecords.value
      .filter((r) => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0)
  })

  const balance = computed(() => totalIncome.value - totalExpense.value)

  const categoryStats = computed(() => {
    const stats: Record<string, number> = {}
    filteredRecords.value
      .filter((r) => r.type === 'expense')
      .forEach((r) => {
        stats[r.category] = (stats[r.category] || 0) + r.amount
      })
    const total = Object.values(stats).reduce((s, v) => s + v, 0)
    return Object.entries(stats).map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? Math.round((amount / total) * 100) : 0,
    }))
  })

  function addRecord(item: Omit<RecordItem, 'id' | 'createdAt'>) {
    const newRecord: RecordItem = {
      ...item,
      id: generateId(),
      createdAt: Date.now(),
    }
    records.value.unshift(newRecord)
  }

  function deleteRecord(id: string) {
    records.value = records.value.filter((r) => r.id !== id)
  }

  function setFilter(type: RecordType | 'all', category: string, dateRange: 'thisMonth' | 'lastMonth' | 'all') {
    filterType.value = type
    filterCategory.value = category
    filterDateRange.value = dateRange
  }

  return {
    records,
    filterType,
    filterCategory,
    filterDateRange,
    filteredRecords,
    totalIncome,
    totalExpense,
    balance,
    categoryStats,
    addRecord,
    deleteRecord,
    setFilter,
  }
})
