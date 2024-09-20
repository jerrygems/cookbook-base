const Recipes = require("../models/recipes")
const Users = require("../models/users")
const jwt = require('jsonwebtoken')




const createRecipe = async (req, resp) => {
    const { recipeName, description, image, content, creator, ingredients } = req.body
    const token = req.headers.authorization.split(" ")[1]
    const email = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        console.log(decoded, err);
        if (err) {
            return resp.status(401).json({ message: "wrong token" })
        }
        return decoded.email
    })
    const userExists = await Users.findOne({ email })
    if (userExists) {
        const newRecipe = new Recipes({
            recipeName: recipeName,
            description: description,
            image: image,
            content: content,
            creator: creator,
            ingredients: ingredients,
        })
        const saved = newRecipe.save()
        if (saved) {
            return resp.status(301).json({ message: "saved successfully" })
        } else {
            return resp.status(401).json({ message: "failed to save" })
        }
    }
}

const deleteRecipe = async (req, resp) => {
    const recipeId = req.query.rid
    const recipeExists = await Recipes.findOne({ _id: recipeId })
    if (recipeExists) {
        const deleted = await Recipes.deleteOne({ _id: recipeId })
        return deleted ? resp.status(301).json({ message: "deleted" }) : resp.status(401).json({ message: "failed to delete" })
    } else {
        return resp.status(404).json({ message: "recipe doesn't exist" })
    }
}

const addToFav = async (req, resp) => {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
        return resp.status(401).json({ message: "please provide the token" })
    }
    // const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    //     if (err) {
    //         return resp.status(401).json({ message: 'malicious token!!!' })
    //     }
    //     return decoded
    // })
    const recipeId = req.query.rid
    const recipeExists = await Recipes.findOne({ _id: recipeId })
    if (recipeExists) {
        return resp.status(301).json({ message: "added to fav" })
    } else {
        return resp.status(401).json({ message: "failed to add" })
    }
}


const getAllRecipes = async (req, resp) => {
    // for later on, use while you need to adjust those admin and local stuff
    // const token = req.headers.authorization.split(" ")[0]
    // if(!token) {
    //     console.log("please provide that token")
    // }

    const allRecipes = await Recipes.find()
    if (allRecipes) {
        return resp.status(200).json({ message: allRecipes })
    }
    return resp.status(404).json({ message: "some error" })
}
const getRecipe = async (req, resp) => {
    const recipeId = req.query.id
    const recipe = await Recipes.findOne({ _id: recipeId })
    if (recipe) {
        return resp.status(200).json({ message: recipe })
    }
    return resp.status(404).json({ message: "appologies" })
}

const updateRecipe = async (req, resp) => {
    const rid = "66ed025b1c11e258fbd5da24" // for testing 
    console.log(rid)
    const { recipeName, description, image, content, creator, ingredients } = req.body
    const token = req.headers.authorization.split(" ")[1]
    console.log(req)
    if (!rid) {
        console.log('id not mentioned')
    }
    if (!token) {
        return resp.status(404).json({ message: "token not found please login && only admins should update this ig" })
    }
    try {
        const existingRecipe = await Recipes.findById(rid)
        if (!existingRecipe) {
            console.log("given recipe not found")
        }
        existingRecipe.recipeName = recipeName
        existingRecipe.description = description
        existingRecipe.image = image
        existingRecipe.content = content
        existingRecipe.creator = creator
        existingRecipe.ingredients = ingredients

        const updateit = await existingRecipe.save()
        if (updateit) {
            return resp.status(200).json({ message: "updated successfully" })
        } else {
            return resp.status(403).json({ message: "failed to submit" })
        }
    } catch (e) {
        console.log(e)
        return resp.status(400).json({ message: e.message })
    }

}

module.exports = {
    createRecipe: createRecipe,
    deleteRecipe: deleteRecipe,
    addToFav: addToFav,
    getAllRecipes: getAllRecipes,
    getRecipe: getRecipe,
    updateRecipe: updateRecipe
}