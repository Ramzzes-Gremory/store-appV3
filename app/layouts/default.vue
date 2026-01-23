<template>
  <div class="flex">
    <AsideMenuAside />

    <div class="flex-1 mt-7 mr-5">
      <NuxtPage />
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full mx-4">
          <h3 class="text-lg font-bold mb-4">{{ message }}</h3>

          <div class="flex justify-end gap-3">
            <button @click="confirm(false)" class="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Скасувати
            </button>
            <button
              @click="confirm(true)"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Підтвердити
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const asideMenu = useAsideMenuStore()
const { isOpen, message, confirm } = useConfirm()
</script>
