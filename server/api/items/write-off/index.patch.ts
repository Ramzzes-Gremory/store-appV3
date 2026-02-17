import { Item } from '~~/server/models/Item'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const updatedItem = await Item.findOneAndUpdate(
            { _id: body._id, },
            {
                $set: {
                    status: body.status,
                    dateOfWritingOff: body.dateOfWrittingOff,
                    comment: body.comment,
                }
            },
            { new: true }
        )
        return { user: updatedItem }
    } catch (err: any) {
        throw createError({ statusCode: 500, data: { message: 'Помилка оновлення екземпляра' } })
    }




})