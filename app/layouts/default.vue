<template>
    <div class="container flex min-h-screen">
     
      
            <AsideMenuAside/>
     
       
            <NuxtPage />
        
    </div>
</template>

<script setup lang="ts">
 const asideMenu = useAsideMenuStore()
</script>