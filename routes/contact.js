const express = require('express');
const router = express.Router();



//CRUD TIME

router.post('/',(req,res)=>{
    res.send('create');
});   

router.get('/',(req,res)=>{
    res.send('read');
});   

router.put('/:id',(req,res)=>{
    res.send('Rupdate');
});   

router.delete('/:id',(req,res)=>{
    res.send('delete cas');
});   

module.exports = router;