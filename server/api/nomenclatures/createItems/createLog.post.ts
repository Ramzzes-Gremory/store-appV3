// const log = new Log({
//     reason: req.body.reason,
//     owner: {
//       id: req.body.owner.id,
//       name: req.body.owner.name,
//     },
//     //
//     dateOfTakeOut: req.body.dateOfTakeOut || '',
//     //
//     dateForming: req.body.dateForming,
//     comment: req.body.comment,
//     items: req.body.items,
//   })
//   try {
//     await log.save()
//     res.status(201).json(log)
//   } catch (e) {
//     console.error('ctr  error log create', e)
//     res.status(e.http ? e.http : 500).json(e.message)
//   }

import { Log } from '~~/server/models/Log'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log(body)

    const newLog = new Log({
        ...body
    })
    try {
        const result = await newLog.save()
        return result
    } catch (e) {
        console.error(e)
        throw createError({ statusCode: 500, message: 'Шось не так з файлом create.post.ts' })
    }
})