<template></template>

<script setup lang="ts">
     const auth = useAuthStore()
     auth.logout()
     navigateTo('/login')
</script>