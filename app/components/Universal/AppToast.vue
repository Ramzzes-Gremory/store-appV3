<template>
  <Transition
    enter-active-class="transition duration-500 ease-out will-change-transform"
    enter-from-class="-translate-y-12 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-500 ease-in will-change-opacity"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-sm px-4">
      <div
        :class="[
          'px-6 py-4 shadow-2xl border flex items-center justify-between rounded-md text-white transition-colors duration-300',
          action === 'error' ? 'bg-red-600 border-red-800' : 'bg-green-900 border-gray-800',
        ]"
      >
        <div class="flex items-center space-x-3">
          <span v-if="action !== 'error'" class="text-black font-bold">✔</span>

          <span v-else class="text-black font-bold">✕</span>
          <p class="text-sm font-medium">{{ message }}</p>
        </div>

        <button @click="show = false" class="ml-4 text-gray-500 hover:text-white">✕</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { show, message, action } = useToast()
</script>
