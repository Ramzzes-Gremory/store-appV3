import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    // Дістаємо токен з заголовка Authorization: Bearer <token>

    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
        throw createError({ statusCode: 401, message: 'Немає токена' })
    }

    const token = authHeader.split(' ')[1]

    try {
        // перевірка токену нашим секретним ключем 
        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string }

        return { valid: true, userId: decoded.userId }
    } catch (error) {
        throw createError({ statusCode: 401, message: 'Токен недійсний' })
    }
})