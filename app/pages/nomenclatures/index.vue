<template>
  <div class="">
    <table class="text-sm font-['Times-New-Roman'] w-full">
      <thead class="text-gray-400 border-b">
        <tr class="font-thin">
          <th class="pb-4">
            <span class="">Назва номенклатури</span>
          </th>
          <th class="pb-4">
            <span class="">Група</span>
          </th>
          <th class="pb-4">
            <span class="">Дата</span>
          </th>
          <th class="pb-4">
            <span class="">Коментар</span>
          </th>

          <th class="pb-4 min-w-40">
            <span class="">
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
        <tr v-for="nomenclature in filteredNomenclatures" class="border-b">
          <td class="font-bold">{{ nomenclature.title }}</td>
          <td class="">{{ nomenclature.group }}</td>
          <td>{{ formatDate(nomenclature.timeBlock?.created) }}</td>
          <td>{{ nomenclature.comment }}</td>

          <td class="flex flex-col items-end gap-2">
            <UniversalBaseIcon
              @click="createItem(nomenclature._id)"
              nameIcon="ep:message-box"
              bg-color="bg-green-500"
            />

            <UniversalBaseIcon
              @click="editNomenclature(nomenclature._id)"
              nameIcon="ep:edit-pen"
              bgColor="bg-blue-500"
            />
            <UniversalBaseIcon
              @click="deleteNomenclature(nomenclature._id)"
              nameIcon="ep:delete"
              bg-color="bg-red-500"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const { triggerToast } = useToast()
const { formatDate } = useFormatter()
const { $api } = useNuxtApp()
const { ask } = useConfirm()
const router = useRouter()

const { data: allNomenclatures, refresh } = await useAsyncData('nomenclatures-list', () =>
  $api('/api/nomenclatures'),
)
const searchStr = ref('')

const filteredNomenclatures = computed(() => {
  const query = searchStr.value.toLowerCase()

  if (!query) {
    return allNomenclatures.value
  }
  return allNomenclatures.value?.filter((nomenclature: any) =>
    nomenclature.title.toLowerCase().includes(query),
  )
})

const createItem = async (id: string | number) => {
  router.push(`/nomenclatures/createItems/${id}`)
}

const editNomenclature = async (id: string | number) => {
  router.push(`/nomenclatures/edit/${id}`)
}

const deleteNomenclature = async (id: string | number) => {
  const confirmed = await ask('Ви точно хочете видалити?')

  if (confirmed) {
    const data = await $api(`/api/nomenclatures/${id}`, {
      method: 'DELETE',
    })
    await refreshNuxtData('nomenclatures-list')
    triggerToast('Ви успішно ВИДАЛИЛИ номенклатуру', 'success')
  } else {
    triggerToast('Операцію відмінено', 'success')
  }
}
</script>
