const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    recipeName: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    content: { type: String, default: "" },
    creator: { type: String, default:""},
    ingredients: { type: String, default: "" },
    postedAt: { type: Date, default: Date.now }
});

const recipes = mongoose.model('recipes', recipeSchema)
module.exports = recipes