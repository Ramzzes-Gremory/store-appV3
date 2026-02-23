import { Item } from '~~/server/models/Item'
import { Log } from '~~/server/models/Log'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log(body)

    try {
        const updatedItem = await Item.findOneAndUpdate(
            { _id: body._id, },
            {
                $set: {
                    status: body.status,
                    dateOfWritingOff: body.dateOfWritingOff,
                    comment: body.comment,
                }
            },
            { new: true }
        )
        const writingOffLog = new Log({
            reason: body.reason,
            owner: {
                id: body.owner.id,
                name: body.owner.name,
            },
            dateForming: body.dateForming,
            comment: body.comment,
            items: updatedItem
        })


        try {
            await writingOffLog.save()
        } catch (e) {
            console.error(e)
            throw createError({ statusCode: 500, message: 'Шось зламалось у файлі write-off patch' })
        }

        return { user: updatedItem }
    } catch (err: any) {
        throw createError({ statusCode: 500, data: { message: 'Помилка оновлення екземпляра' } })
    }





})