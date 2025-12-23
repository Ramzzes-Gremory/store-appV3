<template>
    <div class="container flex min-h-screen">
     
         <aside 
         :class="[' transition-all duration-300', asideMenu.isSidebarOpen ? 'w-64' : 'w-32']"
         >
            <AsideMenuAside/>
        </aside>
       
            <NuxtPage :page-key="route => route.fullPath"/>
        
    </div>
</template>

<script setup lang="ts">
 const asideMenu = useAsideMenuStore()
</script>