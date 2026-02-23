<template>
  <form class="font-sans">
    <!-- title -->
    <h1 class="text-5xl font-bold">Update item</h1>

    <!-- block common data -->
    <div>
      <!-- nomenclature title -->
      <h3 class="italic mt-1">
        Засновано на: <span class="underline">{{ originalTitle }}</span
        >(екземпляр)
      </h3>
      <fieldset class="mt-4">
        <legend class="font-serif">Назва екземпляру</legend>
        <input class="w-full mt-2 px-4 py-1 border rounded-md" v-model="item.title" />
      </fieldset>

      <!-- date of arrival -->
      <fieldset class="mt-4">
        <span class="font-serif">Дата прибуття:</span>
        {{ formatDate(item.dateArrival) }}
      </fieldset>

      <!-- The current owner -->
      <fieldset class="mt-4 flex gap-4">
        <span class="font-serif">Власник:</span>
        {{ item.owner.name }}
      </fieldset>

      <!-- Serial number -->
      <fieldset class="mt-4">
        <span class="font-serif">Серійний номер:</span>
        {{ item.serNumber }}
      </fieldset>

      <!-- select new owner -->
      <fieldset class="mt-4 flex gap-4">
        <span class="font-serif">Зміна власника:</span>
        <select @change="handlerUser" v-model="selectedUser" class="border rounded-md px-2 py-1">
          <option label="Оберіть користувача" disabled selected hidden value=""></option>

          <option
            v-for="user in allUsers"
            :key="user._id"
            :value="user"
            :label="user.name"
          ></option>
        </select>
      </fieldset>

      <!-- comment area -->
      <fieldset class="mt-4">
        <legend class="font-serif">Коментар екземпляра</legend>
        <textarea
          class="rounded-md border w-full mt-2 resize-none px-4 py-2"
          v-model="newItem.comment"
          rows="5"
        />
      </fieldset>
    </div>
    <hr class="border-b-2 border- mt-5" />

    <!-- buttons -->
    <fieldset class="mt-4 flex gap-5">
      <UniversalBaseBtn
        text="Оновити екземпляр"
        :disabled="enableBtn"
        :class="enableBtn ? 'grayscale' : 'grayscale-0'"
        type="button"
        @click="onSubmit"
      />
      <UniversalBaseBtn text="Стерти" bg-color="bg-red-500" type="reset" />
    </fieldset>
  </form>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()
const { formatDate } = useFormatter()
const { triggerToast } = useToast()

const itemId = route.params.id
const originalTitle = ref('')
const enableBtn = ref(true)
const selectedUser = ref({
  _id: '',
  name: '',
})

interface Item {
  _id: string
  title: string
  dateArrival: Date | null
  owner: {
    id: string
    name: string
  }
  serNumber: string
  comment: string
}

const item = ref<Item>({
  _id: '',
  title: '',
  dateArrival: null,
  owner: {
    id: '',
    name: '',
  },
  serNumber: '',
  comment: '',
})

const newItem = ref<Item>({
  _id: '',
  title: '',
  dateArrival: null,
  owner: {
    id: '',
    name: '',
  },
  serNumber: '',
  comment: '',
})

const { data: serverData, refresh } = await useAsyncData<Item>(`item-${itemId}`, () =>
  $api(`/api/items/edit/${itemId}`),
)
const { data: allUsers } = await useAsyncData('users-list', () => $api('/api/users'))

watch(
  serverData,
  (newData) => {
    if (newData) {
      item.value = { ...newData }
      originalTitle.value = item.value.title
    }
  },
  { immediate: true },
)
watch(selectedUser, (newData) => {
  if (newData) {
    // console.log(newData)
    newItem.value.owner.id = newData._id
    newItem.value.owner.name = newData.name
  }
})

const onSubmit = async function () {
  newItem.value.title = item.value.title
  newItem.value.dateArrival = item.value.dateArrival
  newItem.value.serNumber = item.value.serNumber
  newItem.value._id = item.value._id

  try {
    const updatedItem = await $api(`/api/items/edit/${item.value._id}`, {
      method: 'PUT',
      body: newItem.value,
    })

    triggerToast('Данні ЕКЗЕМПЛЯРУ успішно оновлено', 'success')
    await refresh()
    newItem.value.title = ''
    newItem.value.owner = {
      id: '',
      name: '',
    }
    newItem.value.comment = ''
    selectedUser.value = {
      _id: '',
      name: '',
    }
  } catch (e) {
    triggerToast('Помилка оновлення даних ЕКЗЕМПЛЯРУ', 'error')
    console.error(e)
    throw createError({ statusCode: 500, message: 'Щось не вийшло під час оновлення ЕКЗЕМПЛЯРУ' })
  }
}

const handlerUser = function () {
  enableBtn.value = false
}
</script>
