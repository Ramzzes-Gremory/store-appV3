import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/User'


export default defineEventHandler(async (event) => {
    // отримання даних з форми(для входу)
    const config = useRuntimeConfig()
    const body = await readBody(event)

    // запит до бази даних 
    const candidate = await User.findOne({ login: body.login })

    // порівняння паролів та чи існує користувач
    if (!candidate || !(await bcrypt.compare(body.password, candidate.password))) {
        throw createError({ statusCode: 401, message: 'Невірні дані' })
    }

    // створюємо токен
    const token = jwt.sign(
        { userId: candidate._id, department: candidate.department },
        config.jwtSecret,
        { expiresIn: '1d' }
    )



    return {
        token,
        user: {
            id: candidate._id,
            name: candidate.name,
            department: candidate.department
        }
    }
})