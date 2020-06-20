const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config'); // the package config not to be confused with config of the db/defaults wow confusing much?
const jwt = require('jsonwebtoken');
router.post(
  '/',
  [
    check('name', 'Please add a name').not().isEmpty(),
    // check('email','Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a passowrd with 6 or more characters'
    ).isLength({ min: 6, max: 13 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; //" distructure and pull that stuff out from req.body" : brad

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'user already exist' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        // something i want to send : brad also btw
        user: {
          id: user.id, // object payload with blabla bla bla user id basically
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000, // basically means this auth token last for 1 hour supposedly but yea....
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);
router.get('/', (req, res) => {
  res.send('read/get');
});
router.put('/', (req, res) => {
  res.send('update/put');
});
router.delete('/', (req, res) => {
  res.send('delete');
});

module.exports = router;
