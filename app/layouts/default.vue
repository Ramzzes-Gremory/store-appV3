<template>
  <div class="flex">
    <AsideMenuAside />

    <div class="flex-1">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const asideMenu = useAsideMenuStore()
</script>
