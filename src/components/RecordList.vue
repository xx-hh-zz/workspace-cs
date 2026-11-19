<template>
  <div class="space-y-3">
    <RecordItemRow
      v-for="item in records"
      :key="item.id"
      :item="item"
      @delete="$emit('delete', item.id)"
    />
  </div>
</template>

<script setup lang="ts">
import type { RecordItem } from '../types'
import RecordItemRow from './RecordItem.vue'

defineProps<{
  records: RecordItem[]
}>()

defineEmits<{
  delete: [id: string]
}>()
</script>
