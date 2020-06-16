const express= require('express')
const router= express.Router()
const { check, validationResult }= require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User= require('../models/User')

// @route   POST    api/users
// @desc    Register a user
// @access  public

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email id').isEmail(),
    check('password', 'The password length should be a min of 6 characters').isLength({ min: 6 })
], async (req,res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({error: error.array()})
    }
    
    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if (user) {

            return res.status(400).json({ msg: "User already exists"})
        }
        
        user = new User({email, password, name})

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        
        const payload = {
            user : {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, (err, token) => {
            if (err) throw err
            return res.json( {token})
        })

    } catch (err) {
        return res.status(500).json({ msg : 'Errored out while trying to save new user'})
    }
})

module.exports= router