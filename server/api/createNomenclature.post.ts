import { Nomenclature } from '../models/Nomenclature'


export default defineEventHandler(async (event) => {
    const body = await readMultipartFormData(event)



    if (!body || !Array.isArray(body)) {
        throw createError({ statusCode: 400, message: 'Баді не ітеруємий або не є ФормДата' })
    }

    const fields: any = {}
    const savedImages: string[] = []

    for (const item of body) {
        if (item.name === 'images' && item.filename) {
            console.log(`its item ${item}`)
            const fileName = saveImageLocally(item)
            if (fileName) savedImages.push(fileName)
        } else if (item.name) {
            const value = item.data.toString()
            if (value.startsWith('{') || value.startsWith('[')) {
                try {
                    fields[item.name] = JSON.parse(value)
                } catch {
                    fields[item.name = value]
                }
            } else {
                fields[item.name] = value
            }
        }
    }

    try {
        const newNomenclature = new Nomenclature({
            title: fields.title,
            group: fields.group,
            units: fields.units,
            comment: fields.comment,
            source: fields.source || false, // конвертуємо рядок у boolean
            kit: fields.kit,
            imageUrl: savedImages, // Тепер це масив рядків
            timeBlock: {
                created: fields.timeBlock_created,
                modified: fields.timeBlock_modified
            }
        })

        const result = await newNomenclature.save()
        return result
    } catch (error: any) {
        console.error('Помилка валідації:', error.message)
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }

})