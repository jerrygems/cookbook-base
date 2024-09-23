const bcrypt = require("bcrypt")
const users = require("../models/users")
const jwt = require("jsonwebtoken")


const login = async (req, resp) => {
    try {
        const { email, password } = req.body
        const exists = await users.findOne({ email })
        if (exists) {
            const compResult = await bcrypt.compare(password, exists.password)
            if (!compResult) {
                return resp.status(500).json({ message: 'please dont make it breach' })
            }
            const token = jwt.sign({ id: exists._id, email: exists.email, role: exists.role }, process.env.SECRET_KEY, { expiresIn: '1h' })
            return resp.status(200).json({ message: "logged in successfully", token })
        } else {
            return resp.status(500).json({ message: 'you seems like a pro hacker' })
        }

    } catch (err) {
        console.log(err)
    }
}
const register = async (req, resp) => {
    try {
        const { email, password } = req.body
        const exists = await users.findOne({ email })
        if (!exists) {
            const hashedPass = await bcrypt.hash(password, 11)
            const newUser = new users({
                email: email,
                password: hashedPass
            })
            const saved = await newUser.save().catch((e) => console.log(e))
            if (saved) {
                return resp.status(301).json({ message: "registered successfully" })
            } else {
                return resp.status(500).json({ message: "registration failed" })
            }
        } else {
            return resp.status(401).json({ message: "validation error" })
        }
    } catch (err) {
        console.log(err)
        return resp.status(500).json({ message: "something is wrong" })
    }
}

module.exports = {
    login: login,
    register: register
}