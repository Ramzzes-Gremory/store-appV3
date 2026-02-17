import { Item } from '~~/server/models/Item'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
        const createdItems = await Item.insertMany(body)
        return createdItems
    } catch (e) {
        console.error(e)
        throw createError({ statusCode: 500, statusMessage: 'Шось не збереглось' })
    }



})