<template>
    <div class="login_container flex justify-center items-center flex-col mt-5 pt-[4rem] w-full">
        

        <form class="border rounded-md flex flex-col p-[20px] shadow-md w-[500px]" @submit.prevent="handleLogin">
            <h1 class="mb-2 font-bold text-3xl">Вхід у систему</h1>
            <div class=" flex flex-col ">
                <span class="text-sm leading-[40px] font-serif italic">Логін</span>
                <input 
                    v-model="login" 
                    type="text" 
                    required 
                    placeholder="Введіть свій логін"
                    class="px-[15px] rounded-sm border leading-[40px]"
                    ></input>
            </div> 

            <div  class=" flex flex-col ">
                <span class="text-sm leading-[40px] font-serif italic">Пароль</span>
                <input 
                    v-model="password" 
                    type="password" 
                    required 
                    placeholder="Введіть свій пароль"
                    class="px-[15px] mb-[22px] rounded-sm border leading-[40px]"
                    ></input>
            </div> 

            <div>
                <BaseBtn text="Увійти"/>
            </div>
            
        </form>
    </div>
</template>

<script setup lang="ts">
import BaseBtn from '~/components/Universal/BaseBtn.vue'

    definePageMeta({
         layout: false
    })  
    const auth = useAuthStore()

    const login = ref('')
    const password = ref('')

    interface LoginResponse {
        token: string
    }
    async function handleLogin() {
        try{
            const {$api} = useNuxtApp()

            const data = await $api<any>('/api/login', {
                method: 'POST',
                body: {
                    login: login.value,
                    password: password.value
                }
            })
            if(data.token){
                auth.login(data.token)
                await navigateTo('/')
            }
        } catch (error:any){
            console.error('Невірний логін або пароль')
            alert(error.message)
            console.error(error);
        }

       
    }

 
</script>