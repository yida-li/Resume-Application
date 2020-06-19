const express = require('express');
const router = express.Router();
const User = require('../models/User');



//Register 
router.post('/',(req,res)=>{
    res.send('Register a user');
});   

module.exports = router;