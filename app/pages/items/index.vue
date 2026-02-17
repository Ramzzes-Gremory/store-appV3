<template>
  <div class="w-full overflow-hidden">
    <table class="text-[14px] w-full table-fixed">
      <thead class="text-gray-400 border-b">
        <tr class="font-thin">
          <th class="pb-4">
            <span class="">Назва</span>
          </th>
          <th class="pb-4">
            <span class="">S/N</span>
          </th>
          <th class="pb-4">
            <span class="">Дата надходження</span>
          </th>
          <th class="pb-4">
            <span class="">Власник</span>
          </th>
          <th class="pb-4">
            <span class="">Коментар</span>
          </th>

          <th class="pb-4 min-w-40">
            <span>
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
        <tr v-for="item in items" class="border-b">
          <td class="font-bold">{{ item.title }}</td>
          <td class="">{{ item.serNumber }}</td>
          <td>{{ formatDate(item.dateArrival) }}</td>
          <td>{{ item.owner?.name }}</td>
          <td>{{ item.comment }}</td>

          <td class="flex flex-col items-end gap-2">
            <UniversalBaseIcon
              @click="editItem(item._id)"
              nameIcon="ep:edit-pen"
              bgColor="bg-blue-500"
            />
            <UniversalBaseIcon
              @click="deleteItem(item as any)"
              nameIcon="ep:delete"
              bg-color="bg-red-500"
            />
          </td>
          <!-- <span>text</span> -->
        </tr>
      </tbody>
      <!-- ----------------------------------------- -->
    </table>
    <div
      class="fixed inset-0 z-50 items-center justify-center bg-black/50"
      :class="showWritingBlock ? 'flex' : 'hidden'"
    >
      <div class="bg-white px-8 py-10 rounded-xl shadow-xl max-w-sm w-full mx-4 text-gray-500">
        <h3 class="text-3xl mb-4 text-nowrap">Списання екземпляру</h3>

        <form action="#" class="w-full">
          <fieldset class="flex justify-between mb-4">
            <span>Екземпляр: </span>
            <span> {{ selectedItem.title }}, {{ selectedItem.serNumber }}</span>
          </fieldset>

          <fieldset class="flex justify-between items-center mb-4">
            <span>Причина:</span>

            <select
              v-model="log.reason"
              placeholder="Оберіть причину"
              class="p-2 border rounded-md"
            >
              <option label="Оберіть причину" disabled selected hidden value=""></option>

              <option label="Передача(списання)" value="transfer(writting-off)"></option>
              <option label="Списання" value="writting-off"></option>
              <option label="Other 3" value="other3"></option>
              <option label="Other 4" value="other4"></option>
              <option label="Other 5" value="other5"></option>
              <option label="Other 6" value="other6"></option>
            </select>
          </fieldset>

          <fieldset class="flex justify-between items-center mb-4">
            <span>Дата списання: </span>
            <span>{{ formatDate(selectedItem.dateOfWritingOff) }}</span>
          </fieldset>

          <fieldset>
            <span>Коментар</span>
            <textarea
              v-model="log.comment"
              placeholder="Ваш коментар"
              rows="3"
              class="border w-full rounded-md resize-y min-h[100px] overflow-y-auto mt-2 p-2"
            />
          </fieldset>
        </form>

        <div class="flex justify-end gap-3 mt-8">
          <button
            @click="showWritingBlock = false"
            class="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Скасувати
          </button>
          <button
            @click="writingOff(selectedItem._id)"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { triggerToast } = useToast()
const { formatDate } = useFormatter()
const { $api } = useNuxtApp()
const { ask } = useConfirm()
const router = useRouter()
const showWritingBlock = ref(false)
const searchStr = ref('')

interface Item {
  _id: string
  title: string
  dateOfWritingOff: Date | null
  owner: {
    id: string
    name: string
  }
  serNumber: string
  comment: string
  srcNomenclature: string
}

interface Log {
  _id: string
  reason: string
  owner: {
    id: string
    name: string
  }
  dateOfTakeOut: string
  comment: string
  items: Item[]
  dateArrival: Date
}

const log = ref({
  _id: '',
  reason: '',
  owner: {
    id: '',
    name: '',
  },
  dateOfTakeOut: '',
  comment: '',
  items: [],
  dateArrival: new Date(),
})
const selectedItem = ref({
  _id: '',
  title: '',
  dateOfWritingOff: <Date | null>null,
  srcNomenclature: '',
  owner: {
    id: '',
    name: '',
  },
  serNumber: '',
})

const { data: items, refresh } = await useAsyncData('items-list', () => $api('/api/items'))

const editItem = function (id: string) {
  console.log(id)
}
const deleteItem = async function (item: Item) {
  const confirmed = await ask('Впевнені, в списанні екземпляру?')
  // console.log(item)

  if (confirmed) {
    showWritingBlock.value = true
    selectedItem.value._id = item._id
    selectedItem.value.title = item.title
    selectedItem.value.serNumber = item.serNumber
    selectedItem.value.dateOfWritingOff = new Date()
    selectedItem.value.srcNomenclature = item.srcNomenclature
    selectedItem.value.owner.id = item.owner.id
    selectedItem.value.owner.name = item.owner.name
  }
}
const writingOff = async function (id: string) {
  try {
    const dataToUpdateItem = {
      status: 'Written-off',
      dateOfWrittingOff: new Date(),
      comment: log.value.comment,
      _id: selectedItem.value._id,
    }

    const data = await $api(`/api/items/write-off/`, {
      method: 'PATCH',
      body: dataToUpdateItem,
    })
    await refreshNuxtData('items-list')
    triggerToast('Ви успішно СПИСАЛИ екземпляр', 'success')
  } catch (e) {
    triggerToast('Помилка СПИСАННЯ екземпляру', 'error')
    console.error(e)
    throw createError({ statusCode: 500, message: 'Помилка оновлення екземпляру під час списання' })
  }

  // try {
  //   const dataToLog = {
  //     reason: log.value.reason,
  //     owner: {
  //       id: selectedItem.value.owner?.id,
  //       name: `Last: ${selectedItem.value.owner?.name}`,
  //     },
  //     comment: log.value.comment,
  //     item: updatedItem,
  //     dateForming: this.formattedDateTimeString,
  //   }

  //   await this.$store.dispatch('item/createWrittingOffLog', formDataToCreateLog)

  //   // this.dialogFormVisible = true

  //   this.$message.success('Your item was  successfully written off  ')

  //   // console.log(formDataToCreateLog)
  // } catch (e) {
  //   console.log(e)
  //   console.error(e)
  // } finally {
  //   // console.log('its finally')
  //   // window.location.reload()
  //   this.$router.push(`/admin/items`)
  // }
}
</script>
