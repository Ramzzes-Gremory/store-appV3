import bcrypt from 'bcrypt'
import { User } from '~~/server/models/User'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const candidate = await User.findOne({ login: body.login })

    try {
        if (candidate) {
            return console.log("its login already taken")
        } else {
            const salt = bcrypt.genSaltSync(10)
            const user = new User({
                name: body.name,
                department: body.department,
                login: body.login,
                password: bcrypt.hashSync(body.password, salt),
            })
            await user.save()
            return user
        }
    } catch (error) {
        throw createError({ statusCode: 500, data: { message: 'Помилка створення користувача' } })
    }

})