<template>
  <div>
    <!-- <el-breadcrumb separator="/" class="mb">
      <el-breadcrumb-item to="/admin/nomenclatures">List nomenclatures</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ nomenclature.title }}
      </el-breadcrumb-item>
    </el-breadcrumb> -->

    <form @submit.native.prevent="onSubmit" class="pl-5 max-w-prose">
      <h1 class="font-bold text-3xl">Оновлення номенклатури: "{{ tempTitle }}"</h1>

      <fieldset class="mt-3 flex">
        <legend>Заголовок:</legend>
        <input
          v-model="nomenclature.title"
          type="textarea"
          class="border px-5 py-1 mt-3 rounded-md flex-1 text-gray-500"
        />
      </fieldset>

      <fieldset class="mt-3 flex">
        <legend>
          Одиниця вимірювання: <span class="text-gray-500">{{ nomenclature.units }}</span>
        </legend>
      </fieldset>

      <fieldset class="mt-10 flex flex-col">
        <div>
          <legend>Попередні зображення:</legend>
          <div class="flex my-5 gap-6 flex-wrap">
            <div
              v-for="(url, index) in nomenclature.imageUrl"
              :key="index"
              class="border-2 rounded-md relative group"
            >
              <img :src="'/' + url" alt="current image" class="object-cover w-36 h-36" />

              <button
                type="button"
                @click="removeOldImage(index)"
                class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                X
              </button>
            </div>
          </div>
        </div>

        <div>
          <legend>Якщо бажаєте додати нові:</legend>
          <!-- image uploader ------------------------------------------->
          <div class="mt-2 flex gap-5">
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              multiple
              accept="image/*"
              @change="handleFilesChange"
            />
            <div v-for="(img, index) in newImages" :key="index" class="relative group w-24 h-24">
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
        </div>
      </fieldset>

      <fieldset class="mt-4 flex">
        <legend>Коментар:</legend>
        <input
          v-model="nomenclature.comment"
          type="textarea"
          resize="none"
          class="border px-5 py-1 mt-3 rounded-md flex-1 text-gray-500"
        />
      </fieldset>

      <fieldset class="mt-8">
        <span>
          Створено:

          <span class="ml-4 font-bold">
            <Icon name="ep:timer" class="mr-2 text-base" />{{
              formatDate(nomenclature.timeBlock.created)
            }}</span
          >
        </span>
      </fieldset>

      <fieldset class="mt-8">
        <UniversalBaseBtn text="Оновити" />
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const { triggerToast } = useToast()
const { formatDate } = useFormatter()
let tempTitle = ''

const nomenclatureId = route.params.id
const newImages = ref<{ file: File; url: string }[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

interface NomenclatureData {
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
const nomenclature = ref<NomenclatureData>({
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

const { data: serverData, refresh } = await useAsyncData<NomenclatureData>(
  `nomenclature-${nomenclatureId}`,
  () => $api(`/api/nomenclatures/edit/${nomenclatureId}`),
)

watch(
  serverData,
  (newData) => {
    if (newData) {
      nomenclature.value = { ...newData }
      tempTitle = newData.title || ''
    }
  },
  { immediate: true },
)

const handleFilesChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const selectedFiles = Array.from(target.files || [])

  selectedFiles.forEach((file) => {
    if (file.type.startsWith('image/')) {
      newImages.value.push({
        file: file,
        url: URL.createObjectURL(file),
      })
    }
  })
  if (fileInput.value) fileInput.value.value = ''
}

const removeImage = (index: number) => {
  const image = newImages.value[index]
  if (image) {
    URL.revokeObjectURL(image.url)
    newImages.value.splice(index, 1)
  }
}

const removeOldImage = (index: number) => {
  nomenclature.value.imageUrl.splice(index, 1)
}

const onSubmit = async function () {
  const updatedData = new FormData()

  updatedData.append('title', nomenclature.value.title)
  updatedData.append('timeBlock_modified', new Date().toISOString())
  updatedData.append('comment', nomenclature.value.comment)
  // для старих

  nomenclature.value.imageUrl.forEach((url) => {
    updatedData.append('old-images', url)
  })
  // для нових
  newImages.value.forEach((img) => {
    if (img.file) {
      updatedData.append('images', img.file)
    }
  })

  try {
    const data = await useApi(`/api/nomenclatures/edit/${nomenclatureId}`, {
      method: 'PUT',
      body: updatedData,
    })

    triggerToast('Данні успішно оновлено', 'success')
    newImages.value = []
    await refresh()
  } catch (error) {
    triggerToast('Помилка при збережені', 'error')
  }
}
</script>
