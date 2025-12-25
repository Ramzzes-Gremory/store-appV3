<template>
  <aside 
    class="sidebar-container min-h-screen relative" 
    :class="[asideMenu.isSidebarOpen ? 'w-64' : 'w-20']" 
    :data-expanded="asideMenu.isSidebarOpen"
    
    >

    <nav class=" mt-2 flex justify-center">
      <div >
        <div class="flex rounded-3xl  justify-start text-[8] ">
          <div v-if="asideMenu.isSidebarOpen"  class="flex rounded-full border p-1">
            <Icon name="ep:minus" @click="asideMenu.toggleSidebar()"/>
           
          </div>

          <div v-else="asideMenu.isSidebarOpen" class="flex rounded-full border p-1">
            <Icon name="ep:plus"  @click="asideMenu.toggleSidebar()" />
     
         </div>
        </div>
        
        <div class="border-r-2 border-grey pr-3">

         
          <aside-menu-item
          title="Домашня"
          path="/"
          icon="ep:menu"
        />

       
        <aside-menu-item
          title="Створити номенклатуру"
          path="/createNomenclature"
          icon="ep:edit"
        />

       
        <aside-menu-item
          title="Список номенклатур"
          path="/nomenclatures"
          icon="ep:notebook"
        />
        
       
        <aside-menu-item
          title="Екземпляри"
          path="/items"
          icon="ep:message-box"
        />

       
        <aside-menu-item
          title="Видача"
          path="/giveOut"
          icon="ep:takeaway-box"
        />

       
        <aside-menu-item
          title="Користувачі"
          path="/users"
          icon="ep:avatar"
        />

        
        <aside-menu-item
          title="Вийти"
          path="/logout"
          icon="ep:circle-close"
        />
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
  import AsideMenuItem from './AsideMenuItem.vue';

  const asideMenu = useAsideMenuStore()
  // const route = useRoute()

  
 

</script>

<style lang="scss" scoped>
  .sidebar-container {
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: width;
  }
  // СТан "Відкрито"
  .sidebar-container[data-expander="true"]{
    width: 16rem;
  }
  // СТан "Закрито"
  .sidebar-container[data-expander="false"]{
    width: 5rem;
  }

 


</style>

