import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', () => {
    // кука для синхронізації сервера і клієнта
    const token = useCookie<string | null>('token', {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        sameSite: 'lax'
    })

    // стан (state)
    // та гетер (getter)
    const isLoggedIn = computed(() => !!token.value)


    // дії(actions)
    function login(newToken: string) {
        token.value = newToken
    }
    function logout() {
        token.value = null
        navigateTo('/login')
    }

    return {
        token,
        isLoggedIn,
        login,
        logout
    }
})