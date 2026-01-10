<template>
  <div class="flex">
    <AsideMenuAside />

    <div class="flex-1 mt-7 mr-5">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const asideMenu = useAsideMenuStore()
</script>
