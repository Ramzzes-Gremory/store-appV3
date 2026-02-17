import { Item } from '~~/server/models/Item'

export default defineEventHandler(async (event) => {
    try {
        const items = await Item.find({ status: { $ne: "Written-off" } }).sort({ 'dateArrival': -1 }).lean()

        return items
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database error' })
    }
})