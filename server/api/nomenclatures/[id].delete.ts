import bcrypt from 'bcrypt'
import { Nomenclature } from '~~/server/models/Nomenclature'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({ statusCode: 400, message: 'ІД не знайдено' })
    }

    try {
        const nomenclature = await Nomenclature.findById(id)

        if (!nomenclature) {
            throw createError({ statusCode: 404, message: 'Номенклатуру не знайдено' })
        }

        await Nomenclature.deleteOne({ _id: id })
    } catch (error) {

        throw createError({ statusCode: 500, message: 'Помилка сервера' })
    }

})