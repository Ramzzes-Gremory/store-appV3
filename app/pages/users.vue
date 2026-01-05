<template>
  <div class="mt-7 mr-5">
    <table class="text-sm font-['Times-New-Roman'] w-full">
      <thead class="text-gray-400 border-b text-left">
        <tr class="font-thin">
          <th class="pb-4">
            <span class="flex justify-start items-start">Ім'я Користувача</span>
          </th>
          <th class="pb-4">
            <span class="flex justify-start items-start">Відділ</span>
          </th>

          <th class="pb-4 flex flex-1 justify-end gap-8">
            <span class="flex justify-start items-start">
              <UniversalBaseBtn
                @click="formVisible = true"
                text="Створити Користувача"
                class="whitespace-nowrap font-thin"
              />
            </span>
            <span class="flex justify-end items-start">
              <input
                type="text"
                v-model="searchStr"
                placeholder="Введіть для пошуку"
                class="border rounded-md px-3 py-1 text-sm h-full w-full outline-none focus:border-blue-500 transition-colors"
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="text-gray-500">
        <tr v-for="user in filteredUsers" class="border-b text-left">
          <td class="py-4 px-2.5 flex">{{ user.name }}</td>
          <td>{{ user.department }}</td>

          <td class="flex justify-end gap-4">
            <UniversalBaseIcon nameIcon="ep:edit-pen" />
            <UniversalBaseIcon
              @click="deleteUser(user._id)"
              nameIcon="ep:delete"
              bgColor="bg-red-500"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Форма створення користувача -->
    <div v-if="formVisible" class="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        @submit.prevent="onSubmit"
        action="#"
        class="bg-white w-full max-w-md rounded-lg shadow-xl font-['Times_New_Roman'] py-5 px-7 text-gray-600"
      >
        <h1 class="text-3xl">Створення користувача</h1>
        <h3 class="mt-4 font-script text-md">Повне ім'я</h3>
        <input
          v-model="formData.name"
          type="text"
          class="border rounded-md outline-none focus:border-blue-500 w-full"
        />
        <div class="flex items-center justify-between gap-6 mt-7">
          <h3 class="font-[arial] text-md whitespace-nowrap">Оберіть відділ</h3>
          <select
            v-model="formData.department"
            name="#"
            id="#"
            class="w-full border rounded-md outline-none py-0.5 px-4"
            placeholder="Оберіть відділ"
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
        <h3 class="mt-4 font-script text-md">Логін</h3>
        <input
          v-model="formData.login"
          type="text"
          class="border rounded-md outline-none focus:border-blue-500 w-full"
        />
        <h3 class="mt-4 font-script text-md">Пароль</h3>
        <input
          v-model="formData.password"
          type="password"
          class="border rounded-md outline-none focus:border-blue-500 w-full"
        />

        <div class="mt-6">
          <UniversalBaseBtn text="Підтвердити" class="whitespace-nowrap font-thin" />
          <UniversalBaseBtn
            @click.prevent="cancel"
            text="Відмінити"
            class="whitespace-nowrap font-thin"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const { data: allUsers, refresh } = await useAsyncData('users-list', () => $api('/api/users'))
const searchStr = ref('')
const formVisible = ref(false)
const formData = ref({
  name: '',
  department: '',
  login: '',
  password: '',
})
const { triggerToast } = useToast()

// форма пошуку
const filteredUsers = computed(() => {
  const query = searchStr.value.toLowerCase()

  if (!query) {
    return allUsers.value
  }
  return allUsers.value?.filter((user) => user.name.toLowerCase().includes(query))
})

// Створення користувача
const onSubmit = async () => {
  const data = await $api('/api/users', {
    method: 'POST',
    body: formData.value,
  })
  formVisible.value = false
  await refreshNuxtData('users-list')
  formData.value.name = ''
  formData.value.department = ''
  formData.value.login = ''
  formData.value.password = ''
  triggerToast('Ви успішно СТВОРИЛИ користувача', 'success')
}

const cancel = () => {
  formVisible.value = false
  formData.value.name = ''
  formData.value.department = ''
  formData.value.login = ''
  formData.value.password = ''
}

// Видалення користувача
const deleteUser = async (id: string | number) => {
  const data = await $api(`/api/users/${id}`, {
    method: 'DELETE',
  })
  await refreshNuxtData('users-list')
  triggerToast('Ви успішно ВИДАЛИЛИ користувача', 'error')
}
</script>
