const Recipes = require("../models/recipes")
const Users = require("../models/users")
const jwt = require('jsonwebtoken')
const { use } = require("../routes/recipe")




const createRecipe = async (req, resp) => {
    const { recipeName, description, content, creator, ingredients } = req.body
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
        console.log(req.file)
        const imgpath = req.file ? `/uploads/${req.file.filename}` : null
        const newRecipe = new Recipes({
            recipeName: recipeName,
            description: description,
            image: imgpath,
            content: content,
            creator: creator,
            ingredients: ingredients,
        })
        const saved = await newRecipe.save()
        if (saved) {
            return resp.status(301).json({ message: "saved successfully" })
        } else {
            return resp.status(401).json({ message: "failed to save" })
        }
    }
}

const deleteRecipe = async (req, resp) => {
    try {
        const recipeId = req.query.rid
        const recipeExists = await Recipes.findOne({ _id: recipeId })
        if (!recipeExists) {
            return resp.status(404).json({ message: "Recipe doesn't exist" })
        }
        const deleted = await Recipes.deleteOne({ _id: recipeId })
        if (deleted.deletedCount > 0) {
            return resp.status(200).json({ message: "Recipe deleted successfully" })
        } else {
            return resp.status(400).json({ message: "Failed to delete recipe" })
        }
    } catch (error) {
        console.error("error while deleting stuff:", error);
        return resp.status(500).json({ message: "some error here" })
    }
};


const addToFav = async (req, resp) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return resp.status(401).json({ message: "please provide the token" });
    }
    console.log(token)

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            console.log(decoded, err);
            if (err) {
                return resp.status(401).json({ message: "wrong token" })
            }
            return decoded
        })
        console.log(decoded)
        const userId = decoded.id
        console.log(userId)

        const recipeId = req.body.recipeId
        console.log(recipeId)
        const recipeExists = await Recipes.findOne({ _id: recipeId })

        if (!recipeExists) {
            return resp.status(404).json({ message: "recipe not found" })
        }

        const user = await Users.findById(userId);
        console.log(user)
        console.log("reached here")
        if (user) {
            if (user.favourites.includes(recipeId)) {
                user.favourites.pull(recipeId)
                // await user.save();
                // return resp.status(409).json({ message: "already in fav so i just removed it hope there will be no issue" });
            }
            user.favourites.push(recipeId);
            await user.save();
            return resp.status(200).json({ message: "added to favorites" })
        } else {
            return resp.status(400).json({ message: "already in fav" })
        }
    } catch (err) {
        return resp.status(401).json({ message: err })
    }
}
const favAlreadyExists = async (req, resp) => {
    const recipeId = req.params.id
    const token = req.headers.authorization.split(" "[1])
    const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        console.log(decoded, err)
        if (err) {
            return resp.status(401).json({ message: "wrong token" })
        }
    })
    const userinfo = Users.findOne({ _id: decoded.id })
    if(!userinfo){
        return resp.status(404).json({message:"does that exists?"})
    }    
}

const getAllFavs = async (req, resp) => {
    console.log(req)
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    const decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        console.log(decoded, err);
        if (err) {
            return resp.status(401).json({ message: "wrong token" })
        }
        return decoded
    })
    console.log(decoded)
    const userinfo = await Users.findOne({ _id: decoded.id })
    if (userinfo) {
        console.log(userinfo)
        return resp.status(200).json({ message: userinfo })
    } else {
        return resp.status(200).json({ message: "no userinfo found" })
    }
    // if (userinfo) {
    //     console.log(userinfo)
    //     return resp.status(200).json({ message: userinfo })
    // }
    return resp.status(200).json({ message: "failed to get favs" })
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
    try {
        console.log(req)
        const recipeId = req.params.id

        console.log("here: ", recipeId)
        const recipe = await Recipes.findOne({ _id: recipeId })
        console.log(recipe)
        if (recipe) {
            console.log(recipe)
            return resp.status(200).json({
                message: {
                    recipeName: recipe.recipeName,
                    description: recipe.description,
                    image: `${req.protocol}://${req.get('host')}${recipe.image}`,
                    content: recipe.content,
                    creator: recipe.creator,
                    ingredients: recipe.ingredients
                }
            })
        } else {
            return resp.status(404).json({ message: "appologies" })
        }
    } catch (e) {
        console.log(e)
    }

}

const updateRecipe = async (req, resp) => {
    const { recipeName, description, image, content, creator, ingredients } = req.body
    console.log(req.body)
    const rid = req.query.recipeId
    if (recipeName || description || content || creator || ingredients) {
        console.log("here i am")
        const token = req.headers.authorization.split(" ")[1]
        console.log(req)
        if (!rid) {
            console.log('id not mentioned')
        }
        if (!token) {
            return resp.status(404).json({ message: "token not found please login && only admins should update this ig" })
        }
        try {
            let imgpath
            if (req.file) {
                imgpath = `/uploads/${req.file.filename}`
            }
            const updateit = await Recipes.findByIdAndUpdate(
                req.query.recipeId,
                {
                    recipeName,
                    description,
                    content,
                    creator,
                    ingredients,
                    image: imgpath,
                },
                { new: true }
            )

            if (updateit) {
                return resp.status(200).json({ message: "updated successfully" })
            } else {
                return resp.status(403).json({ message: "failed to submit" })
            }
        } catch (e) {
            console.log(e)
            return resp.status(400).json({ message: e.message })
        }
    } else {
        return resp.status(403).json({ message: "atleast update single value why you're wasting time" })
    }

}

const searchRecipe = async (req, resp) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return resp.status(400).json({ message: "Search term is required" });
    }
    try {
        const results = await Recipes.find({
            $or: [
                { recipeName: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { ingredients: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } },
                { creator: { $regex: searchTerm, $options: 'i' } },
            ]
        });
        return resp.status(200).json({ message: results });
    } catch (error) {
        console.error("error during search:", error);
        return resp.status(500).json({ message: "server error", error: error.message });
    }
}


module.exports = {
    createRecipe: createRecipe,
    deleteRecipe: deleteRecipe,
    addToFav: addToFav,
    getAllRecipes: getAllRecipes,
    getRecipe: getRecipe,
    updateRecipe: updateRecipe,
    searchRecipe: searchRecipe,
    getAllFavs: getAllFavs
}