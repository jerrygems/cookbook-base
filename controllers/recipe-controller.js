const multer = require("multer")
const Recipes = require("../models/recipes")
const Users = require("../models/users")
const jwt = require('jsonwebtoken')
const path = require('path')
const { jwtDecode } = require()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ dest: 'uploads/' })

const createRecipe = async (req, resp) => {
    const { recipeName, description, image, content, creator, ingredients } = req.body
    const token = req.headers.authorization.split(" ")[1]
    const email = jwt.verify(token, process.env, (err, decoded) => {
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
            ingredients: ingredients, S
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
    const token = req.headers.authorization
    if (!token) {
        const recipeId = req.query.rid
        const recipeExists = await Recipes.findOne({ _id: recipeId })
        if (recipeExists) {
            // const 
        }
    }
}