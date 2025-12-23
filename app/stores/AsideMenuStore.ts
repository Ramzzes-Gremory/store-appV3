import { defineStore } from "pinia";

export const useAsideMenuStore = defineStore('asideMenu', () => {
    const isSidebarOpen = useCookie<boolean>('sidebar_state', {
        default: () => true
    })

    function toggleSidebar() {
        isSidebarOpen.value = !isSidebarOpen.value
    }
    return { isSidebarOpen, toggleSidebar }
})