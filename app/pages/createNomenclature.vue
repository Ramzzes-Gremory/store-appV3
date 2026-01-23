<template>
  <div class="">
    <form @submit.native.prevent="onSubmit">
      <!-- title -->
      <h1 class="text-3xl font-bold">Створити нову номенклатуру</h1>

      <!-- nomenclature title -->
      <fieldset class="mt-4 mb-4">
        <legend class="font-serif italic text-sm mb-2">Назва номенклатури:</legend>
        <input
          v-model="formData.title"
          class="border w-full rounded-md px-2 py-1"
          placeholder="Назва товару"
        />
      </fieldset>

      <!-- selector group -->
      <fieldset class="flex flex-row gap-8 mb-4 items-center">
        <span class="font-serif italic text-sm">Оберіть групу:</span>
        <select v-model="formData.group" class="border rounded-md px-2 py-1">
          <option label="Оберіть групу" disabled selected hidden value=""></option>
          <option label="ПК" value="pc"></option>
          <option label="Монітор" value="monitor"></option>
          <option label="Клавіатура" value="keyboards"></option>
          <option label="Миша" value="mice"></option>
          <option label="Ноутбук" value="laptop"></option>
          <option label="Принтер" value="printer"></option>
          <option label="Звукова система" value="soundSystems"></option>
          <option label="Планшет" value="tablet"></option>
          <option label="Телефонний апарат" value="phoneMachine"></option>
          <option label="Електронні прилади" value="electronicMachine"></option>
          <option label="Голосовий Шлюз" value="voiceGateway"></option>
          <option label="Зарядна станція" value="chargingStation"></option>
          <option label="Акумулятор" value="battery"></option>
          <option label="Радіостанція" value="radioStation"></option>
          <option label="Виріб К-2РБ" value="k-2rb"></option>
          <option label="Комутатор мережевий" value="networkSwitch"></option>
          <option label="Ретранслятор" value="repeater"></option>
          <option label="Р-402" value="r-402"></option>
          <option label="Кабель" value="cables"></option>
          <option label="Супутниковий термінал" value="satelliteTerminal"></option>
          <option label="Антени" value="antennas"></option>
          <option label="Інше" value="other"></option>
        </select>
      </fieldset>

      <!-- unit of measurement -->
      <fieldset class="mb-4 flex gap-8 items-center">
        <span class="font-serif italic text-sm">Одиниця вимірювання:</span>
        <div class="font-sans flex gap-2">
          <input type="radio" id="Choice1" name="units" value="одиниця" v-model="formData.units" />
          <label for="Choice1">Одиниця</label>

          <input type="radio" id="Choice2" name="units" value="комплект" v-model="formData.units" />
          <label for="Choice2">Комплект</label>

          <input type="radio" id="Choice3" name="units" value="метри" v-model="formData.units" />
          <label for="Choice3">Метри</label>
        </div>
      </fieldset>

      <!-- time block -->
      <fieldset class="font-serif italic text-sm flex items-center gap-4 mb-4">
        <span>Дата створення:</span>
        <p class="underline font-bold">{{ formattedDateString }}</p>
      </fieldset>

      <!-- where it came from -->
      <fieldset class="mb-4 flex items-center gap-4 font-serif italic text-sm">
        <span>Волонтерське:</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="formData.source" class="sr-only peer" />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
          ></div>
          <span class="ml-3 text-sm font-medium text-gray-900"></span>
        </label>
      </fieldset>

      <!-- kit params -->
      <fieldset class="flex items-center gap-4 mb-4">
        <span class="font-serif italic text-sm">Набір:</span>

        <div class="flex flex-row items-center">
          <input
            disabled
            type="checkbox"
            id="item"
            value="Одиниця"
            v-model="formData.kit"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="item" class="ml-2 text-sm text-gray-700 cursor-pointer"> Одиниця </label>
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="box"
            value="Заводська коробка"
            v-model="formData.kit"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="box" class="ml-2 text-sm text-gray-700 cursor-pointer">
            Заводська коробка
          </label>
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="invoice"
            value="Накладна"
            v-model="formData.kit"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="invoice" class="ml-2 text-sm text-gray-700 cursor-pointer"> Накладна </label>
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            id="other1"
            value="Інше1"
            v-model="formData.kit"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="other1" class="ml-2 text-sm text-gray-700 cursor-pointer"> Інше 1 </label>
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            id="other2"
            value="Інше2"
            v-model="formData.kit"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label for="other2" class="ml-2 text-sm text-gray-700 cursor-pointer"> Інше 2 </label>
        </div>
      </fieldset>

      <!-- image uploader -->
      <div>
        <legend class="font-serif italic text-sm mb-2">Додати зображення:</legend>
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          multiple
          accept="image/*"
          @change="handleFilesChange"
        />
        <div v-for="(img, index) in images" :key="index" class="relative group w-24 h-24">
          <img
            :src="img.url"
            alt="upload-img"
            class="w-full h-full object-cover rounded-lg border border-gray-200"
          />

          <button
            type="button"
            @click="removeImage(index)"
            class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg class="w-3 h-3" file="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          @click="fileInput?.click()"
          class="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all text-gray-400"
        >
          <span class="text-2xl">+</span>
          <span class="text-[10px] uppercase font-bold">Додати</span>
        </button>
      </div>

      <!-- comment area -->
      <fieldset class="mt-4">
        <legend class="font-serif italic text-sm mb-2">Коментар:</legend>
        <input
          type="textarea"
          v-model="formData.comment"
          placeholder="Ваш коментар"
          class="border w-full rounded-md px-2 py-1 mb mb-4"
        />
      </fieldset>

      <!-- buttons -->
      <fieldset class="mt-8 flex gap-6">
        <UniversalBaseBtn text="Створити номенклатуру"> </UniversalBaseBtn>
        <UniversalBaseBtn text="Скинути" type="button" @click="resetForm()"></UniversalBaseBtn>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
const { triggerToast } = useToast()
const { $api } = useNuxtApp()

const formattedDateString = ref('')
const formData = ref({
  title: '',
  group: '',
  units: '',
  timeBlock: {
    created: new Date(),
    modified: new Date(),
  },
  source: '',
  kit: ['Одиниця'],
  comment: '',
})
const images = ref<{ file: File; url: string }[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const formattedDate = onMounted(() => {
  const currentDate = new Date()

  const formatter = new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  // formatter.format(currentDate)
  // formData.value.timeBlock.created = currentDate.toLocaleDateString()
  const stringedDate = currentDate.toLocaleDateString()
  formData.value.timeBlock.created = currentDate
  formattedDateString.value = stringedDate
})

const handleFilesChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const selectedFiles = Array.from(target.files || [])

  selectedFiles.forEach((file) => {
    if (file.type.startsWith('image/')) {
      images.value.push({
        file: file,
        url: URL.createObjectURL(file),
      })
    }
  })
  if (fileInput.value) fileInput.value.value = ''
}
const removeImage = (index: number) => {
  const image = images.value[index]
  if (image) {
    URL.revokeObjectURL(image.url)
    images.value.splice(index, 1)
  }
}

const onSubmit = async function () {
  const fd = new FormData()

  fd.append('title', formData.value.title)

  fd.append('group', formData.value.group)
  fd.append('units', formData.value.units)

  fd.append('timeBlock_created', formData.value.timeBlock.created.toISOString())
  fd.append('timeBlock_modified', formData.value.timeBlock.modified.toISOString())
  fd.append('source', formData.value.source)
  fd.append('kit', JSON.stringify(formData.value.kit))
  fd.append('comment', formData.value.comment)

  images.value.forEach((img) => {
    if (img.file) {
      fd.append('images', img.file)
    }
  })

  try {
    const data = await $api('/api/createNomenclature', {
      method: 'POST',
      body: fd,
    })
    triggerToast('Ви успішно СТВОРИЛИ номенклатуру', 'success')
    resetForm()
  } catch (error) {
    triggerToast('Не вдалось СТВОРИТИ номенклатуру', 'error')
    throw createError({ statusCode: 500, message: 'Шось зламалось зі сторони сервера в вью файлі' })
  }
}
const resetForm = function async() {
  formData.value.title = ''
  formData.value.group = ''
  formData.value.units = ''
  formData.value.timeBlock = {
    created: new Date(),
    modified: new Date(),
  }
  formData.value.source = ''
  formData.value.kit = ['Одиниця']
  formData.value.comment = ''
  images.value = []
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>
