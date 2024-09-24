const express = require("express")
const multer = require("multer")
const path = require("path")
const router = express.Router()
const usersController = require("../controllers/user-controller")
const authController = require("../controllers/auth-controller")
const recipeController = require("../controllers/recipe-controller")
const verifyAdmin = require("../middlewares/verify-admin")


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    })
});

// router.use((req,res,next) => {
//     console.log(req);
//     next();
// })

router.get("/uinfo", verifyAdmin, (req, resp, next) => {
    usersController.getAllUsersInfo(req, resp, next)
})

router.post("/register", (req, resp, next) => {
    authController.register(req, resp, next)
})

router.post("/login", (req, resp, next) => {
    authController.login(req, resp, next)
})

router.get("/check", (req, resp, next) => {
    usersController.verifyRole(req, resp, next)
})

router.post("/create-recipe", upload.single('image'), (req, resp, next) => {
    recipeController.createRecipe(req, resp, next)
})
router.get("/get-favs", (req, resp, next) => {
    recipeController.getAllFavs(req, resp, next)
})
router.delete("/delete-recipe", (req, resp, next) => {
    recipeController.deleteRecipe(req, resp, next)
})
router.get("/get-all-recipes", (req, resp, next) => {
    recipeController.getAllRecipes(req, resp, next)
})
router.get("/created-by", (req, resp, next) => {
    recipeController.getUserCreatedRecipes(req, resp, next)
})
router.get("/is-the-creator/:recipeId", (req, resp, next) => {
    recipeController.isCreatedByUser(req, resp, next)
})
router.get("/get-recipe/:id", (req, resp, next) => {
    recipeController.getRecipe(req, resp, next)
})
router.put("/update-recipe", upload.single('image'), (req, resp, next) => {
    recipeController.updateRecipe(req, resp, next)
})
router.get("/search-query", (req, resp, next) => {
    recipeController.searchRecipe(req, resp, next)
})
router.get("/exists", (req, resp, next) => {
    recipeController.favAlreadyExists(req, resp, next)
})
router.put("/add-fav", (req, resp, next) => {
    recipeController.addToFav(req, resp, next)
})
router.delete("/remove-fav", (req, resp, next) => {
    recipeController.removeFav(req, resp, next)
})



module.exports = router