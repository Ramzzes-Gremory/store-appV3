<template>
  <div class="mt-7 pr-8">
    <!-- <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/users">Список користувачів</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ user.name }}
      </el-breadcrumb-item>
    </el-breadcrumb> -->

    <form
      @submit.prevent="handleUpdate"
      class="flex flex-col font-['Times-New_Roman'] text-gray-700"
    >
      <h1 class="font-bold text-xl">
        Зміна користувача: <span class="font-normal">"{{ user.name }}"</span>
      </h1>

      <!-- User`s name -->
      <span class="text-sm leading-[40px] font-serif italic">Ім'я користувача:</span>
      <input
        v-model="user.name"
        class="outline-none border focus:border-blue-500 rounded-md py-1 px-2"
      />

      <!-- selector of departments -->
      <div class="flex gap-6 mt-4">
        <span class="text-sm leading-[40px] font-serif italic">Оберіть відділ:</span>
        <select
          v-model="user.department"
          placeholder="Оберіть відділ"
          class="border rounded-md px-1"
        >
          <option value="department1">Відділ 1</option>
          <option value="department2">Відділ 2</option>
          <option value="department3">Відділ 3</option>
          <option value="department4">Відділ 4</option>
          <option value="department5">Відділ 5</option>
          <option label="Управління" value="management">Управління</option>
          <option value="bytarrzrdn">Бу та РР зрдн</option>
          <option value="1zrbatr1zrdn">1 зрбатр 1 зрдн</option>
          <option value="1zrdn">3 зрбатр 1 зрдн</option>
          <option value="1zrdn">БУ та РЛР 1 зрдн</option>
          <option value="5zrbatr_2zrdn">5 зрбатр 2 зрдн</option>
          <option value="2zrdn">6 зрбатр 2 зрдн</option>
          <option value="1bpla">1 БпЛА ДпБпЛА</option>
          <option value="1dpbpla">БУ ДпБпЛА</option>
          <option value="GBY">ГБУ</option>
        </select>
      </div>

      <!-- login -->
      <span class="text-sm leading-[40px] font-serif italic">Логін:</span>
      <input
        v-model="user.login"
        type="text"
        class="outline-none border focus:border-blue-500 rounded-md py-1 px-2"
      />

      <!-- password -->
      <span class="text-sm leading-[40px] font-serif italic">Новий пароль:</span>
      <input
        v-model="user.password"
        type="password"
        class="outline-none border focus:border-blue-500 rounded-md py-1 px-2"
      />

      <div>
        <BaseBtn text="Підтвердити зміни" class="mt-8" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import BaseBtn from '~/components/Universal/BaseBtn.vue'

const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { triggerToast } = useToast()

const userId = route.params.id
const loading = ref(true)

interface UserData {
  name: string
  department: string
  login: string
  password?: string
}
const user = ref<UserData>({
  name: '',
  department: '',
  login: '',
  password: '',
})

const loadUser = async () => {
  try {
    const data = await useApi<UserData>(`/api/users/edit/${userId}`)

    if (data) {
      user.value = data
      user.value.password = ''
      console.log(`user.value FRONTEND`, user.value)
    }
  } catch (error: any) {
    triggerToast('Не вдалося завантажити дані', 'error')
  }
}
onMounted(() => {
  loadUser()
  loading.value = false
})

const handleUpdate = async () => {
  try {
    await useApi(`/api/users/edit/${userId}`, {
      method: 'PUT',
      body: user.value,
    })

    triggerToast('Данні успішно оновлено', 'success')
    setTimeout(() => router.push('/users'), 2000)
  } catch (error) {
    triggerToast('Помилка при збережені', 'error')
  }
}
</script>
