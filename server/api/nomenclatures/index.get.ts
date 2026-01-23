import { Nomenclature } from '~~/server/models/Nomenclature'

export default defineEventHandler(async (event) => {
    try {
        const nomenclatures = await Nomenclature.find().sort({ 'timeBlock.created': -1 }).lean()

        return nomenclatures
    } catch (error) {
        throw createError({ statusCode: 500, message: 'Database error' })
    }
})