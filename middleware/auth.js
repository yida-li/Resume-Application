const jwt = require('jsonwebtoken');
const config = require('config');

// i guess function, a component within that checks auth token with jsonwebtoken, basically encryption facade

// middleware function
module.exports = function (req, res, next) {
  // get token from header

  const token = req.header('x-auth-token'); // seemingly an access point for Postman api tho......

  if (!token) {
    return res.status(401).json({ msg: 'No token,authorization denied' });
  }
  try {
    // if there is a token, we're gonna verify it, we're gonna pull out the payload
    // we're gonna set the user thats in that payload to req.user so that we'll have access to this req.user inside the route
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();// w/e this is
  } catch (err) {

res.status(401).json({msg:'Token is not valid'});



  }
};
