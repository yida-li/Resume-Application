const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config'); // the package config not to be confused with config of the db/defaults wow confusing much?
const jwt = require('jsonwebtoken');

// authentication is meant to access private routes
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); // looks like a boiler plate i can use here
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        // something i want to send : brad also btw
        user: {
          id: user.id, // object payload with blabla bla bla user id basically
        },
      };

      jwt.sign(    // the jwt object is signing the payload i guess?
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000, // basically means this auth token last for 1 hour supposedly but yea....
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // the important thing to understand is that we get the token, if all conditions above is satisfied
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

const auth = require('../middleware/auth'); // a function ill be calling
router.get('/', auth, async (req, res) => {
  
  
  try{

    const user = await (await User.findById(req.user.id)).isSelected('-password');
    console.log('at least something works');
    res.json(user);     // if auth works, i get res.json user data 
  }catch(err){

    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
  

  
    //passing in auth as second parameter






  res.send('read/get');
});
router.put('/', (req, res) => {
  res.send('update/put');
});
router.delete('/', (req, res) => {
  res.send('delete');
});

module.exports = router;
