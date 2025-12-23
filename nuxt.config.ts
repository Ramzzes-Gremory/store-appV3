// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    public: {
      apiBase: ''
    }

  },
  future: {
    compatibilityVersion: 4,
  },

  css: [
    '~/assets/css/main.css'
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  compatibilityDate: '2025-06-19',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/icon'
  ]
})