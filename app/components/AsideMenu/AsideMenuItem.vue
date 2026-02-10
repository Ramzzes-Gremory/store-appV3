<template>
  <nuxt-link
    :to="path"
    class="transition-colors duration-300 flex px-4 rounded-lg"
    :class="[isActive ? 'filter-blue text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200']"
  >
    <li class="flex justify-start items-center leading-8 text-base list-image-none py-4">
      <Icon
        :name="icon"
        class="text-2xl whitespace-nowrap flex-shrink-0 transition-colors duration-300"
        :class="isActive ? 'text-white' : 'text-gray-500'"
      />

      <div
        class="grid transition=[grid-template-columns, opacity] duration-500 ease-in-out"
        :class="
          asideMenu.isSidebarOpen
            ? 'grid-cols-[1fr] opacity-100 ml-4'
            : 'grid-cols-[0fr] opacity-0 ml-0'
        "
      >
        <span class="text-base overflow-hidden whitespace-nowrap">{{ title }}</span>
      </div>
    </li>
  </nuxt-link>
</template>

<script setup lang="ts">
const asideMenu = useAsideMenuStore()
const route = useRoute()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

const isActive = computed(() => route.path === props.path)
</script>

<style lang="scss" scoped>
.sidebar-text {
  display: inline-block;
  // overflow: hidden;
  white-space: nowrap;
  max-width: 0;
  opacity: 0;
  visibility: hidden;
  // transition: max-width 0.5s ease, opacity 0.3s ease;
  transition: max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1) opacity 0.4s ease visibility 0.4s;
}

:deep(.sidebar-container[data-expander='true']) .sidebar-text {
  max-width: 200px;
  opacity: 1;
  visibility: visible;
}

.sidebar-container[data-expander='false'] .sidebar-text {
  max-width: 0;
  opacity: 0;
}
.filter-blue {
  filter: invert(47%) sepia(87%) saturate(1836%) hue-rotate(198deg) brightness(101%) contrast(94%);
}
</style>
