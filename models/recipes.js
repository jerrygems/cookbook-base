const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    recipeName: String,
    description: String,
    image: { type: String, data: Buffer },
    content: String,
    creator: String,
    ingredients: String,
    postedAt: { type: Date, default: Date.now }
});

const recipes = mongoose.model('recipes', recipeSchema)
module.exports = recipes