import bcrypt from 'bcrypt'
import { User } from '~~/server/models/User'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const password = body.password.trim()

    const hashedPassword = await bcrypt.hash(password, 10)


    const candidate = await User.findOne({ login: body.login })

    try {
        if (candidate) {
            return console.log("its login already taken")
        } else {
            const user = new User({
                name: body.name,
                department: body.department,
                login: body.login.trim(),
                password: hashedPassword,
            })
            await user.save()
            return user
        }
    } catch (error) {
        throw createError({ statusCode: 500, data: { message: 'Помилка створення користувача' } })
    }

})