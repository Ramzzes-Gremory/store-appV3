export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const token = useCookie('token')
    const baseURL = config.public.apiBase as string

    if (!baseURL) {
        console.error('Помилка: NUXT_PUBLIC_API_BASE - не визначено у .env')
    }



    // Власний "розумний" завантажувач
    const api = $fetch.create({
        baseURL: baseURL || 'http:/localhost:3000',
        onRequest({ options }) {
            options.headers = options.headers || {}

            if (token.value) {
                const headers = (options.headers as unknown as Record<string, string>)
                headers['Authorization'] = `Bearer ${token.value}`
            }
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                token.value = null

                await navigateTo('/login')
            }
        }
    })

    return {
        provide: {
            api: api
        }
    }
})