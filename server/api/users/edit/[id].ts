import { User } from '~~/server/models/User'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
    const method = event.method
    const id = getRouterParam(event, 'id')

    if (method === "GET") {
        try {
            const user = await User.findById(id)
            if (!user) {
                throw createError({ statusCode: 401, message: 'Користувача не знайдено!' })
            }
            return user
        } catch (error) {
            throw createError({ statusCode: 500, message: 'Помилка в запиті до сервера, на пошук користувача' })
        }

    }

    if (method === 'PUT') {
        const body = await readBody(event)

        const updateData: any = {
            name: body.name,
            department: body.department,
            login: body.login.trim(),
        }



        if (body.password && body.password.trim() !== '') {
            if (body.password.startsWith('$2b$')) {
                console.log(`Це вже хеш, пропускаємо хешування`);
            } else {
                const cleanPassword = body.password.trim()
                updateData.password = await bcrypt.hash(cleanPassword, 10)
            }
        }
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: id, },
                { $set: updateData },
                { new: true }
            )
            return { user: updatedUser }
        } catch (err: any) {
            throw createError({ statusCode: 500, data: { message: 'Помилка оновлення користувача' } })
        }
    }

})