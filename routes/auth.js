const express = require('express');
const router = express.Router();





router.get('/',(req,res)=>{
    res.send('authentication getting');
});   


router.post('/',(req,res)=>{
    res.send('authentication posting in');
});  


module.exports = router;