const mongoose = require("mongoose")
const { Schema } = mongoose

const usersSchema = new Schema({
    email: String,
    password: String,
    role: String,
    createAt: { type: Date, default: Date.now }
})
const users = mongoose.model('Recipe', usersSchema)