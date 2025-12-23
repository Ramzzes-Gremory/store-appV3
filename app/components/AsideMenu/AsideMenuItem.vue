<template>
      <li >
          <nuxt-link :to="path">{{ title }}</nuxt-link>
        </li>
</template>

<script setup lang="ts">

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
})
</script>