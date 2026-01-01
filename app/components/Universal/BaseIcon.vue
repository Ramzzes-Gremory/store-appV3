<template>
  <div
    class="rounded-full w-10 h-10 flex justify-center items-center text-[16px]"
    :class="[bgColor, 'text-white']"
  >
    <nuxt-link :to="to">
      <Icon :name="nameIcon" />
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
interface Props {
  to: string
  nameIcon: string
  bgColor?: string
  textColor?: string
}
const { bgColor = 'bg-blue-400', textColor = 'text-white' } = defineProps<Props>()
</script>
