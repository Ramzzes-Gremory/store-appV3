<template>
  <div class="mt-6 mr-5">
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
              <UniversalBaseBtn text="Створити Користувача" class="whitespace-nowrap font-thin" />
            </span>
            <span class="flex justify-end items-start">
              <input
                type="text"
                placeholder="Введіть для пошуку"
                class="border rounded-md px-3 py-1 text-sm h-full w-full outline-none focus:border-blue-500 transition-colors"
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="text-gray-500">
        <tr v-for="user in users" class="border-b text-left">
          <td class="py-3 px-2.5">{{ user.name }}</td>
          <td>{{ user.department }}</td>

          <td class="flex justify-end gap-4">
            <UniversalBaseIcon to="/" nameIcon="ep:edit-pen" />
            <UniversalBaseIcon to="/" nameIcon="ep:delete" bgColor="bg-red-500" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const users = await $api('/api/users')
// console.log(data)
</script>
