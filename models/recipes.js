const mongoose = require("mongoose")
const { Schema } = mongoose

const Recipes = new Schema({
    title: String,
    ingredients: String,
    thumbImage: { type: Buffer },
    postedBy: String,
    postedAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe',Recipes)
