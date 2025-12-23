<template>
  <div class="wrapper" >
    <nav
      class="aside_container_menu border-r-2 border-grey"
    >
      <div >
        <div v-if="asideMenu.isSidebarOpen">
          <Icon name="ep:minus" @click="asideMenu.toggleSidebar()"/>
          <!-- <button >+</button> -->
        </div>

        <div v-else="asideMenu.isSidebarOpen">
          <Icon name="ep:plus"  @click="asideMenu.toggleSidebar()"/>
           <!-- <button @click="asideMenu.toggleSidebar()">-</button> -->
        </div>
        
        <aside-menu-item
          title="Домашня"
          path="/"
        />
        <aside-menu-item
          title="Створити номенклатуру"
          path="/createNomenclature"
        />
        <aside-menu-item
          title="Список номенклатур"
          path="/nomenclatures"
        />
        <aside-menu-item
          title="Екземпляри"
          path="/items"
        />
        <aside-menu-item
          title="Видача"
          path="/giveOut"
        />
        <aside-menu-item
          title="Користувачі"
          path="/users"
        />
        <aside-menu-item
          title="Вийти"
          path="/logout"
        />
        </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import AsideMenuItem from './AsideMenuItem.vue';

  const asideMenu = useAsideMenuStore()

  const isMounted = ref(false)

  onMounted(() => {
    isMounted.value = true
  })

</script>

<style lang="scss" scoped>
.aside_container_menu {
  max-width:  200px;
  // background-color: grey;  
  transition: width 1s ease;
}
.aside_container_menu.is-collapsed {
  max-width: 90px;
}
</style>

