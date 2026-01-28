import { Nomenclature } from '~~/server/models/Nomenclature'
import { writeFile } from 'fs/promises'
import path from 'path'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const method = event.method
    const id = getRouterParam(event, 'id')

    if (method === "GET") {
        try {
            const nomenclature = await Nomenclature.findById(id)
            if (!nomenclature) {
                throw createError({ statusCode: 401, message: 'Номенклатуру не знайдено!' })
            }
            return nomenclature
        } catch (error) {
            throw createError({ statusCode: 500, message: 'Помилка в запиті до сервера, на пошук номенклатури' })
        }

    }

    if (method === 'PUT') {
        const body = await readMultipartFormData(event)

        if (!body) {
            throw createError({ statusCode: 400, message: 'Немає даних' })
        }

        let title = ''
        let comment = ''
        let modified = ''
        const keepImages: string[] = []
        const newFiles: { name: string; data: Buffer }[] = []

        // Розбираємо ФормДАта  вручну
        for (const part of body) {
            if (part.name === 'title') title = part.data.toString()
            if (part.name === 'comment') comment = part.data.toString()
            if (part.name === 'timeBlock_modified') modified = part.data.toString()

            // збираємо масив старих фото
            if (part.name === 'old-images') {
                keepImages.push(part.data.toString())
            }

            // збираємо нові файли
            if (part.name === 'images' && part.filename) {
                newFiles.push({
                    name: `${Date.now()}-${part.filename}`,
                    data: part.data
                })
            }
        }

        const savedFileNames: string[] = []
        for (const file of newFiles) {
            const filePath = path.join(process.cwd(), 'public', file.name)
            await writeFile(filePath, file.data)
            savedFileNames.push(file.name)
        }

        // поєднуємо старі і нові
        const finalImageUrls = [...keepImages, ...savedFileNames]


        try {
            const updatedNomenclature = await Nomenclature.findOneAndUpdate(
                { _id: id, },
                {
                    $set: {
                        title,
                        comment,
                        imageUrl: finalImageUrls,
                        'timeBlock.modified': modified
                    }
                },
                { new: true }
            )

            return { user: updatedNomenclature }
        } catch (err: any) {
            throw createError({ statusCode: 500, data: { message: 'Помилка оновлення номенклатури' } })
        }
    }

})