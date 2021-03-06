const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

function generateAccessToken(username)
  {
    
    return jwt.sign(username, process.env.JWT_TOKEN, { expiresIn: '1800s' });
  }


  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
    if (token == null) return res.sendStatus(401)
    console.log(token)
  
    jwt.verify(token, process.env.JWT_TOKEN , (err , user) => {
      console.log(user)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }
  module.exports = {generateAccessToken,authenticateToken}