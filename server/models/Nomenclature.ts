import { Schema, model } from 'mongoose'

const nomenclatureSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true,
    },
    units: {
        type: String,
        required: true,
    },
    timeBlock: {
        created: {
            type: Date,
            required: false,
        },
        modified: {
            type: Date,
            required: false,
        },
    },
    source: {
        type: Boolean,
        required: false,
    },
    kit: {
        type: Array,
        required: false,
    },
    comment: {
        type: String,
        required: false,
    },
    imageUrl: { type: [String] },
})

export const Nomenclature = model('Nomenclature', nomenclatureSchema)
