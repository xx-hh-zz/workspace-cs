<template>
  <div class="flex flex-col h-full max-w-5xl mx-auto bg-white shadow-lg">
    <AppHeader />
    <main class="flex-1 overflow-y-auto pb-20">
      <router-view />
    </main>
    <nav
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40"
    >
      <div class="max-w-5xl mx-auto flex justify-around items-center h-14">
        <router-link
          to="/"
          class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary transition-colors"
          :class="{ 'text-primary': $route.path === '/' }"
        >
          <HomeIcon class="w-6 h-6" />
          <span class="text-xs mt-0.5">首页</span>
        </router-link>
        <router-link
          to="/records"
          class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary transition-colors"
          :class="{ 'text-primary': $route.path === '/records' }"
        >
          <ListIcon class="w-6 h-6" />
          <span class="text-xs mt-0.5">明细</span>
        </router-link>
      </div>
    </nav>
    <RecordModal
      v-if="showModal"
      @close="showModal = false"
      @saved="onSaved"
    />
    <button
      class="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-30 active:scale-95 transition-transform"
      aria-label="记一笔"
      @click="showModal = true"
    >
      <PlusIcon class="w-8 h-8" />
    </button>
    <div
      v-if="toast"
      class="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm animate-fade"
    >
      {{ toast }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { Home as HomeIcon, List as ListIcon, Plus as PlusIcon } from 'lucide-vue-next'
import AppHeader from './components/AppHeader.vue'
import RecordModal from './components/RecordModal.vue'

const showModal = ref(false)
const toast = ref('')

function onSaved() {
  showModal.value = false
  showToast('已保存')
}

function showToast(msg: string) {
  toast.value = msg
  setTimeout(() => {
    toast.value = ''
  }, 2000)
}

provide('showToast', showToast)
</script>

<style scoped>
@keyframes fade {
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}
.animate-fade {
  animation: fade 0.2s ease-out;
}
</style>
