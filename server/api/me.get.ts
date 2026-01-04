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
        const jwtSecret = config.jwtSecret
        if (!jwtSecret) {
            throw createError({ statusCode: 500, message: 'JWT Secret is not defined' })
        }
        const decoded = jwt.verify(token as string, jwtSecret) as unknown as { userId: string }

        return { valid: true, userId: decoded.userId }
    } catch (error) {
        throw createError({ statusCode: 401, message: 'Токен недійсний' })
    }
})