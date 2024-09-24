const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'local', enum: ['admin', 'local'] },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipes' }],
    createAt: { type: Date, default: Date.now }
})
const users = mongoose.model('users', usersSchema)
module.exports = users