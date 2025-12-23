import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
})

export const User = model('User', UserSchema)


