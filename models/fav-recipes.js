const mongoose = require("mongoose")

const favRecipeSchema = new mongoose.Schema({
    recipeId:String,
    userId:String
})

const favRecipes = mongoose.model('favrecipes',favRecipeSchema)
module.exports = favRecipes