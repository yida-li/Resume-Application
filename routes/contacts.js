const express = require('express');
const router = express.Router();

router.post('/',(req,res) => {

    res.send('create/post');
})
router.get('/',(req,res) => {

    res.send('read/get');
})
router.put('/:id',(req,res) => {

    res.send('update/put');
})
router.delete('/:id',(req,res) => {

    res.send('delete');
})

module.exports = router;