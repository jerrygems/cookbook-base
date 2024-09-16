var jwt = require("jsonwebtoken")

const verifyToken = async (req, resp, next) => {
    try {
        if (!req.header.authorization) {
            resp.send("not an admin")
        }
        jwt.verify(req.header.authorization, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err)
            } else {
                if (!decoded.role === "admin") {
                    return resp.status(404).json({ message: "permission denied" })
                } else {
                    return resp.status(302).json({ message: "access granted" })
                }
            }
        })
    } catch (err) {
        console.log(err)
    }


}
module.exports = verifyToken