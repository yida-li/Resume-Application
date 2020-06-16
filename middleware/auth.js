const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    // Extract the token from the header
    const token = req.header('x-auth-token')
    //Check if there is a token
    if (!token) {
        return res.status(401).json({msg: "Missing token, authorization failed"})
    }

    try {
       // Access the payload from the token, it contains the user object set in routes/auth.js
       const decoded = jwt.verify(token, config.get('jwtSecret'))
       // set the user object in the req so that this can be used elsewhere in the code.
       // Middleware code can modify the request, response objects.
       req.user = decoded.user
       // Calling next to execute the next middleware code if this middleware does not end
       // the request/response cycle. Otherwise the request is left hanging.
       next()

    } catch (err) {
        return res.status(401).json({ msg : "Token is not valid" })
    }
}