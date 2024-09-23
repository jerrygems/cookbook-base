const Users = require("../models/users")
const jwt = require("jsonwebtoken")

const getAllUsersInfo = async (req, resp) => {
    try {
        const allUsers = await Users.find().select("-password");
        return resp.status(200).json(allUsers);
    } catch (err) {
        console.log(err);
        return resp.status(500).json({ message: "An error occurred while fetching users" });
    }
}

const verifyRole = async (req, resp) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return resp.status(401).send('access denied');
        }

        const verified = jwt.verify(token, process.env.SECRET_KEY)
        if (verified.role === "admin") {
            return resp.status(200).json({ message: verified.role })
        }
        return resp.status(401).json({ message: "You don't have permission to access this content" });
        next();
    } catch (err) {
        resp.status(400).json({ message: "Invalid Token" });
    }
}

module.exports = {
    getAllUsersInfo: getAllUsersInfo,
    verifyRole: verifyRole
}