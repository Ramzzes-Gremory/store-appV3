import { Schema, model } from 'mongoose'

const logSchema = new Schema({
    reason: String,
    dateArrival: {
        type: Date,
        default: Date.now,
    },
    owner: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name: String,
    },
    dateOfTakeOut: String,
    dateForming: String,
    comment: String,
    items: Array,
})

export const Log = model('Log', logSchema)