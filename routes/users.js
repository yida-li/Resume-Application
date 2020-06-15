const express = require('express');
const router = express.Router();

// the express is required to use Router function object lol

router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;
