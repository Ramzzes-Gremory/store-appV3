<template>
  <button
    class="rounded-full py-2 px-4 font-['Arial'] font-sm"
    :type="props.type"
    :class="[props.bgColor, props.textColor]"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as () => 'submit' | 'button' | 'reset',
    default: 'submit',
  },
  text: {
    type: String,
    default: 'Заглушка',
  },
  bgColor: {
    type: String,
    default: 'bg-blue-400',
  },
  textColor: {
    type: String,
    default: 'text-white',
  },
})
</script>
