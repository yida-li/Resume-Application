const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('Registering for membership');
});

router.get('/', (req, res) => {
  res.send('get loggegd in user somethine something?');
});

module.exports = router;
