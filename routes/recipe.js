const express = require("express")
const multer = require("multer")
const router = express.Router()
const usersController = require("../controllers/user-controller")
const authController = require("../controllers/auth-controller")
const recipeController = require("../controllers/recipe-controller")
const verifyAdmin = require("../middlewares/verify-admin")


const upload = multer(
    multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname) + path.extname(file.filename));
        }
    })
);

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
router.post("/add-fav", (req, resp, next) => {
    recipeController.addToFav(req, resp, next)
})
router.delete("/delete-recipe", (req, resp, next) => {
    recipeController.deleteRecipe(req, resp, next)
})
router.get("/get-all-recipes", (req, resp, next) => {
    recipeController.getAllRecipes(req, resp, next)
})
router.get("/get-recipe", (req, resp, next) => {
    recipeController.getRecipe(req, resp, next)
})
router.put("/update-recipe", (req, resp, next) => {
    recipeController.updateRecipe(req, resp, next)
})


module.exports = router