import { Schema, model } from 'mongoose'

const itemSchema = new Schema({
    title: String,
    dateArrival: {
        type: Date,
        default: Date.now,
    },
    dateOfWritingOff: {
        type: Date,
        default: null,
    },
    srcNomenclature: {
        type: Schema.Types.ObjectId,
        ref: 'Nomenclature',
    },
    owner: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name: String,
    },
    legally: Boolean,
    comment: String,
    idCard: Number,
    kit: Array,
    serNumber: String,
    status: String,
})

export const Item = model('Item', itemSchema)
