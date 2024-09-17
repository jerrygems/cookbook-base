const express = require("express")
const router = express.Router()
const usersController = require("../controllers/user-controller")
const authController = require("../controllers/auth-controller")
const recipeController = require("../controllers/recipe-controller")
const verifyAdmin = require("../middlewares/verify-admin")

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

router.get("/create-recipe", (req, resp, next) => {
    recipeController.createRecipe(req, resp, next)
})

module.exports = router