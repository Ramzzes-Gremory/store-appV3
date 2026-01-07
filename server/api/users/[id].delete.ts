import bcrypt from 'bcrypt'
import { User } from '~~/server/models/User'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({ statusCode: 400, message: 'ІД не знайдено' })
    }

    try {
        const user = await User.findById(id)

        if (!user) {
            throw createError({ statusCode: 404, message: 'Користувача не знайдено' })
        }

        await User.deleteOne({ _id: id })
    } catch (error) {

        throw createError({ statusCode: 500, message: 'Помилка сервера' })
    }

})