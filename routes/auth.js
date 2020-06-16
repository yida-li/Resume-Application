const express= require('express')
const { check, validationResult }= require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router= express.Router()

// @route   GET    api/auth
// @desc    Get logged in user
// @access  private

// This route is protected as it gets the logged in user. So we need to
// bring in the middleware 
router.get('/', auth, async (req,res) => {
    try {
        // We hit this route after we successfully login pass through the middleware that sets
        // the request object. So the id is within the user object within the request
        const user = await User.findById(req.user.id).select("-password") 
        return res.json(user)
    } catch (err) {
        return res.status(500).send('Server error')
    }
    
})

// @route   POST    api/auth
// @desc    Auth user and get token
// @access  public

// Get the email and password from the front end form and validate
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({errors: errors.array()})
    }
    
    try {
        // Validated, so retrieve email and password from request body
        const { email, password } = req.body

        // Access the record from the database that has the same email and the one in the request
        let user = await User.findOne({ email })
        if (!user) {
            // return res.status(500).json({ msg : "Invalid credentials"})
            return res.status(500).send('Invalid credentials')
        }
    
        // Check if the password in the request body matches the one in the record from db
        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
            // return res.status(500).json({ msg: "Invalid credentials"})
            return res.status(500).send('Invalid credentials')
        }
    
        // Create a payload that contains the validated user to be sent as a token
        const payload = {
            user: {
                id: user.id
            }
        }
    
        // Send the token with the payload. The payload resides in the header of the request
        // The payload user object is accessed using middleware
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn : 36000}, (err, token) => {
            if (err) throw err
            res.json( {token} )
        })       
    } catch (err) {
        return res.status(500).send('Server error')
    }

})
module.exports= router