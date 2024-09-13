const mongoose = require("mongoose")
const { Schema } = mongoose

const Recipes = new Schema({
    Title: String,
    Ingredients: String,
    ThumbImage: { type: Buffer },
    PostedBy: String,
    PostedAt: { type: Date, default: Date.now }
})