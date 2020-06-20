const express = require('express');
const router = express.Router();
// authentication is meant to access private routes
router.post('/',(req,res) => {

    res.send('create/post');
})
router.get('/',(req,res) => {

    res.send('read/get');
})
router.put('/',(req,res) => {

    res.send('update/put');
})
router.delete('/',(req,res) => {

    res.send('delete');
})

module.exports = router;