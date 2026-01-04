<template>
  <div
    class="rounded-full w-10 h-10 flex justify-center items-center text-[16px]"
    :class="[bgColor, 'text-white']"
  >
    <button type="button">
      <Icon :name="nameIcon" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  nameIcon: string
  bgColor?: string
  textColor?: string
}
const { bgColor = 'bg-blue-400', textColor = 'text-white' } = defineProps<Props>()
</script>
