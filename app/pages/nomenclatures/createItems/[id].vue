<template>
  <div>
    <form @submit.native.prevent="onSubmit">
      <!-- title -->
      <h1 class="text-5xl">Створити нові екземпляри</h1>

      <!-- block common data -->
      <div class="max-w-xl">
        <!-- nomenclature title -->
        <h3 class="italic my-2">Засновано на : {{ oldTitle }} (номенклатурі)</h3>

        <!-- date of arrival -->
        <fieldset class="flex gap-4 mt-4">
          <span>Дата прибуття:</span>
          <span class="underline">{{ formatDate(nomenclature.timeBlock.created) }}</span>
        </fieldset>

        <!-- unit of measurement -->
        <fieldset class="flex gap-4 mt-4">
          <span>Одиниця вимірювання:</span>
          <span class="underline">{{ nomenclature.units }}</span>
        </fieldset>

        <!-- The owner -->
        <fieldset class="flex gap-4 mt-4">
          <span>Власник:</span>
          <select
            @change="handleUserChange"
            v-model="selectedUser"
            class="border rounded-md px-2 py-1"
          >
            <option disabled selected hidden :value="null">Оберіть користувача</option>

            <option
              v-for="user in allUsers"
              :key="user._id"
              :value="user"
              :label="user.name"
            ></option>
          </select>
        </fieldset>

        <!-- counter of items -->
        <div class="flex gap-4 my-4">
          <span>Кількість:</span>
          <div class="relative w-36">
            <input
              type="number"
              v-model="quantity"
              min="0"
              :disabled="!selectedUser"
              class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full rounded-md border-0 py-1.5 pl-16 pr-10 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div
              class="absolute inset-y-0 left-0 flex-col"
              :class="selectedUser ? 'flex' : 'hidden'"
            >
              <button
                type="button"
                @click="quantity > 0 ? quantity-- : null"
                class="flex h-full items-center justify-center px-3 hover:bg-gray-100 rounded-l-md"
              >
                <span class="text-gray-500">-</span>
              </button>
            </div>
            <div
              class="absolute inset-y-0 right-0 flex-col"
              :class="selectedUser ? 'flex' : 'hidden'"
            >
              <button
                type="button"
                @click="quantity++"
                class="flex h-full items-center justify-center px-3 hover:bg-gray-100 border-gray-300 rounded-r-md"
              >
                <span class="text-gray-500">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <!-- block unique data -->
      <div class="p-6">
        <!-- item card -->
        <div
          v-for="card in cards"
          :key="card.idCard"
          class="border-2 rounded-lg shadow-md my-6 p-4"
        >
          <!-- header name for card -->
          <div class="mb-4">
            <legend>Екземпляр: {{ card.idCard }}</legend>
            <hr />
          </div>

          <!-- on what based(what nomenclature) -->
          <fieldset>
            <h3 class="italic">Засновано на: {{ oldTitle }} (номенклатурі)</h3>
          </fieldset>

          <!-- title of nomenclature -->
          <fieldset class="mt-4">
            <legend>Заголовок екземпляра</legend>
            <input
              v-model="card.title"
              class="border w-full rounded-md px-4 py-1 text-gray-500 mt-2"
            />
          </fieldset>

          <!-- serial number unique item -->
          <fieldset class="mt-4">
            <legend>Серійний номер:</legend>
            <input
              v-model="card.serNumber"
              class="border w-full rounded-md px-4 py-1 text-gray-500 mt-2"
            />
          </fieldset>

          <!-- status -->
          <fieldset class="flex mt-4 gap-4">
            <span>Статус:</span>
            <div class="font-sans flex gap-2">
              <input
                type="radio"
                :id="`Choice1-${card.idCard}`"
                :name="`status${card.idCard}`"
                value="On the store"
                v-model="card.status"
              />
              <label :for="`Choice1-${card.idCard}`">На складі</label>

              <input
                type="radio"
                :id="`Choice2-${card.idCard}`"
                :name="`status${card.idCard}`"
                value="Not on the store"
                v-model="card.status"
              />
              <label :for="`Choice2-${card.idCard}`">Не на складі</label>
            </div>
          </fieldset>

          <!-- legally -->
          <fieldset class="flex gap-4 mt-4">
            <span>Офіційно:</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="card.legally" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
              ></div>
              <span class="ml-3 text-sm font-medium text-gray-900"></span>
            </label>
          </fieldset>

          <!-- kit of item -->
          <fieldset class="flex gap-4 mt-4">
            <span>Комплект:</span>
            <div class="flex flex-row items-center">
              <input
                disabled
                type="checkbox"
                :id="`item${card.idCard}`"
                value="Одиниця"
                v-model="card.kit"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label :for="`item${card.idCard}`" class="ml-2 text-sm text-gray-700 cursor-pointer">
                Одиниця
              </label>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                :id="`box${card.idCard}`"
                value="Заводська коробка"
                v-model="card.kit"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label :for="`box${card.idCard}`" class="ml-2 text-sm text-gray-700 cursor-pointer">
                Заводська коробка
              </label>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                :id="`invoice${card.idCard}`"
                value="Накладна"
                v-model="card.kit"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                :for="`invoice${card.idCard}`"
                class="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Накладна
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                :id="`other1${card.idCard}`"
                value="Інше1"
                v-model="card.kit"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                :for="`other1${card.idCard}`"
                class="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Інше 1
              </label>
            </div>
            <div class="flex items-center">
              <input
                type="checkbox"
                :id="`other2${card.idCard}`"
                value="Інше2"
                v-model="card.kit"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                :for="`other2${card.idCard}`"
                class="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Інше 2
              </label>
            </div>
          </fieldset>

          <!-- comment area -->
          <fieldset class="mt-6">
            <legend>Коментар:</legend>
            <textarea
              type="textarea"
              rows="5"
              v-model="card.comment"
              class="border w-full rounded-md px-4 text-gray-500 mt-2 break-words whitespace-pre-wrap resize-none"
            />
          </fieldset>
        </div>
      </div>

      <!-- buttons -->
      <fieldset class="px-6 mb-6">
        <UniversalBaseBtn
          :disabled="0 >= quantity"
          text="Створити екземпляр(и)"
          :class="quantity > 0 ? 'grayscale-0' : 'grayscale'"
        />
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()
const { formatDate } = useFormatter()
const { triggerToast } = useToast()

const nomenclatureId = route.params.id
let quantity = ref(0)

interface NomenclatureData {
  _id: string
  title: string
  group: string
  units: string
  timeBlock: {
    created: string | Date
    modified: string | Date
  }
  source: boolean
  kit: [string]
  comment: string
  imageUrl: string[]
}
interface User {
  _id: string
  name: string
  department: string
  login: string
}
interface Card {
  idCard: number
  title: string
  serNumber: string
  owner: {
    id: string
    name: string
  }
  status: string
  legally: boolean
  kit: string[]
  comment: string
  srcNomenclature: string
}

const selectedUser = ref<User | null>(null)

const nomenclature = ref<NomenclatureData>({
  _id: '',
  title: '',
  group: '',
  units: '',
  timeBlock: {
    created: '',
    modified: '',
  },
  source: false,
  kit: [''],
  comment: '',
  imageUrl: [''],
})

const card = ref<Card>({
  idCard: 0,
  title: nomenclature.value.title,
  srcNomenclature: nomenclature.value._id,
  serNumber: '',
  owner: {
    id: '',
    name: '',
  },
  status: 'On the store',
  legally: true,
  kit: ['Одиниця'],
  comment: '',
})
const cards = ref<Card[]>([])

const { data: serverData, refresh } = await useAsyncData<NomenclatureData>(
  `createItems-${nomenclatureId}`,
  () => $api(`/api/nomenclatures/createItems/${nomenclatureId}`),
)

const { data: allUsers } = await useAsyncData('users-list', () => $api('/api/users'))

let oldTitle = ref('')

watch(
  [serverData, quantity],
  ([newData, newQuantity], [oldData, oldQuantity]) => {
    const previousQt = oldQuantity ?? 0
    if (newData !== oldData) {
      nomenclature.value = { ...newData } as NomenclatureData
      oldTitle.value = nomenclature.value.title
    }

    if (newQuantity > previousQt) {
      card.value.idCard++
      const newCard = {
        ...card.value,
        idCard: card.value.idCard,
        srcNomenclature: nomenclature.value._id,
        owner: {
          id: selectedUser.value?._id || '',
          name: selectedUser.value?.name || '',
        },
      }

      cards.value.push(newCard)
    } else if (newQuantity < previousQt) {
      cards.value.pop()
      card.value.idCard--
    }
  },
  { immediate: true },
)

const handleUserChange = function () {
  if (selectedUser.value !== null) {
  }
}
const onSubmit = async function () {
  // console.log(cards.value)
  const data = await $api(`/api/nomenclatures/createItems/`, {
    method: 'POST',
    body: cards.value,
  })

  // якщо все ок сервер повертає повідомлення "ok"
  if (data === 'ok') {
    triggerToast('Ви успішно створили екземпляр(и)', 'success')
    router.push(`/nomenclatures/`)
  } else console.log('its NOT OK!!!')
}
</script>
