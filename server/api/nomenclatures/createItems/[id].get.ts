import { Nomenclature } from '~~/server/models/Nomenclature'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')


    try {
        const data = await Nomenclature.findById(id)
        if (!data) {
            throw createError({ statusCode: 401, message: 'Номенклатуру не знайдено!' })
        }
        return data
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Помилка в запиті до сервера, на пошук користувача' })
    }


})