<template>
  <NuxtLayout>
    
    <NuxtPage/>
  </NuxtLayout>
</template>


<script setup lang="ts">
  // const mainStore = useMainStore()
  const auth = useAuthStore()
// onMounted(async ()=> {
  

//   if(auth.token){
//     try{
//       const {$api} = useNuxtApp()
//       auth.user = await $api('/api/auth/me')
//     } catch (error){
//       console.error('Сесія застаріла')
//     }
//   }
// })
</script>
