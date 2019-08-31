/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(500).json({message: "token missing"})
  }

  token = token.split(" ")
  
  if (token[0] !== 'bearer' || !token[1])
  {
      return res.status(500).json({message: 'bad jwt'})
  }
  
  jwt.verify(token[1], "sssshhhhhhhH!!", (error, newToken) => {
      if (error) {
        return res.status(401).json({message: 'error verifying token', error: error.message});
      } else {
          
        req.token = newToken;
        next();
      }
  });

};

