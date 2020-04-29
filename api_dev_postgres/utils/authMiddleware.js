const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) return res.status(401).json({ general: "You need to login first" });
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ errors: 'Not Authenticated' })
    }
}