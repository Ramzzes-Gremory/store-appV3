export const useApi = <T>(url: string, options: any = {}) => {
    const authStore = useAuthStore()
    const config = useRuntimeConfig()

    return $fetch<T>(url, {
        baseURL: config.public.apiBase,
        ...options,

        onRequest({ options }) {
            const headers = new Headers(options.headers)

            if (authStore.token) {
                headers.set('Authorization', `Bearer ${authStore.token}`)
            }
        },
        onResponseError({ response }) {
            if (response.status === 401) {
                // console.warn('Сесія застаріла, вихід...')
                authStore.logout()
                navigateTo('/login')
            }
        }
    })

}