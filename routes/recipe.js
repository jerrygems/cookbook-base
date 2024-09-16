const express = require("express")
const router = express.Router()
const usersController = require("../controllers/user-controller")
const verifyAdmin = require("../middlewares/verify-admin")

router.get("/uinfo", verifyAdmin, (req, resp, next) => {
    usersController.getAllUsersInfo(req, resp, next)
})

router.post("/register", (req, resp, next) => {
    authController.loginUser(req,resp,next)
})

router.post("/login", (req, resp, next) => {
    authController.registerUser(req,resp,next)
})

router.get("/check", (req, resp, next) => {
    usersController.verifyRole(req, resp, next)
})

module.exports = router