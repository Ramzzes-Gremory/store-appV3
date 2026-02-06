import { User } from '~~/server/models/User'

export default defineEventHandler(async (event) => {
    try {
        const users = await User.find().select('-password').lean()

        return users
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database error' })
    }
})