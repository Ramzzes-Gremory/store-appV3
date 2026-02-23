import { Types } from 'mongoose'
import { Item } from '~~/server/models/Item'

export default defineEventHandler(async (event) => {
    const method = event.method
    const id = getRouterParam(event, 'id')


    if (method === 'GET') {
        try {
            const item = await Item.findById(id)
            if (!item) {
                throw createError({ statusCode: 401, message: 'Екземпляр не знайдено!' })
            }
            return item
        } catch (error) {
            throw createError({ statusCode: 500, message: 'Помилка в запиті до сервера, на пошук Екземпляру' })
        }
    }

    if (method === 'PUT') {

        const body = await readBody(event)
        const objectId = new Types.ObjectId(body._id)

        const $set = {
            title: body.title,
            owner: body.owner,
            comment: body.comment,
        }
        try {
            const item = await Item.findOneAndUpdate(
                {
                    _id: objectId,
                },
                { $set },
                { new: true }
            )
            return item
        } catch (e) {
            console.log(e)
            throw createError({ statusCode: 500, message: 'якась проблема на сервері з оновленням екземпляру' })
        }
    }

})