import { Nomenclature } from '~~/server/models/Nomenclature'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')


    try {
        // чомусь без ені внизу показує помилку в терміналі в іншому файлі, пізніше треба буде розібратись
        const data = await Nomenclature.findById(id) as any
        if (!data) {
            throw createError({ statusCode: 401, message: 'Номенклатуру не знайдено!' })
        }
        return data as any
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Помилка в запиті до сервера, на пошук користувача' })
    }


})