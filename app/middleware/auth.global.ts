export default defineNuxtRouteMiddleware((to) => {
    const { $api } = useNuxtApp()
    const auth = useAuthStore()

    // якщо користувач не на сторінці логіну і немає токена - редирект

    if (to.path !== '/login' && !auth.token) {
        return navigateTo('/login')
    }

    // якщо вже авторизований і намагається зайти на логін
    if (to.path !== '/login' && !auth.isLoggedIn) {
        return navigateTo('/')
    }


})