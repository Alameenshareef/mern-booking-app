const jwt = require("jsonwebtoken")
const { createError } = require("../utils/error")


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, "you are not authenticated"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is invalid"))
        req.user = user
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "you are not autherized"))

        }
    })
}


const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "you are not autherized"))

        }
    })
}



module.exports = { verifyToken, verifyUser, verifyAdmin }