<template>
    <button 
        class="rounded-full  py-2 px-4   font-['Arial'] font-sm " 
        type="submit"
        :class="[bgColor, textColor] "
        >
            {{ text}} 
        </button>
</template>

<script setup lang="ts">

    interface Props {
        text: string
        bgColor?: string
        textColor?: string
    }
    const {
        bgColor = 'bg-blue-400',
        textColor = 'text-white',
        text = 'Заглушка'
    } = defineProps<Props>()
   
</script>