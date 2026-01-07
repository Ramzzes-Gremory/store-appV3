import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/User'


export default defineEventHandler(async (event) => {
    // отримання даних з форми(для входу)
    const config = useRuntimeConfig()
    const body = await readBody(event)
    // console.log(body.password)

    // запит до бази даних 
    const candidate = await User.findOne({ login: body.login.trim() })
    console.log(`Кандидат: `, candidate)
    if (!candidate) {
        console.log('Користувача з таким логіном не знайдено');
        throw createError({
            statusCode: 401,
            message: 'Не вірний логін або пароль'
        })

    }
    // console.log(candidate.password)
    const isMatch = await bcrypt.compareSync(body.password, candidate.password)
    console.log('Результат порівняння:', isMatch)
    // порівняння паролів та чи існує користувач
    console.log('Dva passworda cpmpare:');

    console.log(body.password);
    console.log(candidate.password);

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