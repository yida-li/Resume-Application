const express= require('express')
const router= express.Router()
const { check, validationResult }= require('express-validator')
const Contact= require('../models/Contact')
const auth = require('../middleware/auth')

// @route   GET    api/contacts
// @desc    Get all users contacts
// @access  private

router.get('/', auth, async (req,res) => {
    try {
        // Since we are running the middleware and then performing db operations
        // we have access to the user id from the token.
        //  sort({date:-1}) sorts the records in ascending order of date.
        const contacts = await Contact.find({ user: req.user.id }).sort({date: -1})
        return res.json(contacts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Errored while fetching contacts details")
    }
})

// @route   POST    api/contacts
// @desc    Add a new contact
// @access  private

// We need to run both middleware and checks before adding a new contact
router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty()
]],async (req,res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
    
        const { name, email, phone, type } = req.body
    
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user : req.user.id
        })
    
        const contact = await newContact.save()
        return res.json(contact)        
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")  
    }
})

// @route   PUT    api/contacts
// @desc    Update contact
// @access  private

router.put('/:id', auth, async (req,res) => {

    // Get all the fields that need to be updated and form an object
    const { name, email, phone, type } = req.body

    const contactFields = {}
    if (name) contactFields.name = name
    if (email) contactFields.email = email
    if (phone) contactFields.phone = phone
    if (type) contactFields.type = type

    try {
        // req.params.id contains the id of the user that is passed along with the url
       let contact = await Contact.findById(req.params.id) 
       if (!contact) {
           return res.status(401).json({msg:"Contact/User not found"})
       }

       // Mak sure that only that user can update his contact 
       if (contact.user.toString() !== req.user.id) {
           return res.status(401).json({ msg: "Unauthorized access to contacts"})
       }

       contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new: true})
        res.json(contact)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server error")         
    }
})

// @route   DELETE    api/contacts
// @desc    Delete contact
// @access  private

router.delete('/:id', auth, async (req,res) => {

    try {
        // req.params.id contains the id of the user that is passed along with the url
       let contact = await Contact.findById(req.params.id) 

       if (!contact) {
           return res.status(401).json({msg:"Contact/User not found"})
       }

       // Mak sure that only that user can update his contact 
       if (contact.user.toString() !== req.user.id) {
           return res.status(401).json({ msg: "Unauthorized access to contacts"})
       }

       await Contact.findByIdAndRemove(req.params.id)
       return res.json({ msg: "Contact removed "})
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")         
    }
})
module.exports= router