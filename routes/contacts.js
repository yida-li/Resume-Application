const express = require('express');
const router = express.Router();

// Create
router.post('/', (req, res) => {
  res.send('add contact');
});

// Read
router.get('/:id', (req, res) => {
  res.send('get all your contact');
});

// Update
router.put('/:id', (req, res) => {
  res.send('update contact');
});

// Delete
router.delete('/:id', (req, res) => {
  res.send('delete contact');
});

module.exports = router;
