const router = require('express').Router();
const bcrypt = require('bcryptjs')
const usersDb = require('../database/dbConfig.js');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const addUser = req.body;

  try{
      (!addUser.username || !addUser.password) &&
        res.status(500).json({message: "missing username, password, or department"});

      addUser.password = bcrypt.hashSync(addUser.password, 14);
      const addedUser = await usersDb('users').insert(addUser);
      const selectedUser = await usersDb('users').where({id: addedUser[0]}).first();
          
      return res.status(200).json(selectedUser);
  }

  catch (err) {
      return res.status(500).json({err: err.message})
  }
});

router.post('/login', async (req, res) => {
  let user = req.body;

  try{
    if (!user.username || !user.password) {
        return res.status(500).json({message: "missing username or password"})
    }
    
    const selectedUser = await usersDb('users').where({ username: user.username }).first();
    
    if (!selectedUser) {
        return res.status(500).json({message: "Could find not user"})
    };
    
    if (!bcrypt.compareSync(user.password, selectedUser.password)) {
        return res.status(500).json({message: "Incorrect password"})
    }

    const token = generateToken(user);
    
    return res.status(200).json({message: `Logged in as ${selectedUser.username}!`, token: token })
}
catch (err) {
    return res.status(500).json({err: err.message})
}

});

function generateToken (user) {
    const payload = {
      subject: user.id, // sub in payload is what the token is about
      username: user.username,
      department: user.department
    };
  
    const options = {
      expiresIn: '1d', // show other available options in the library's documentation
    };
  
    // extract the secret away so it can be required and used where needed
    return jwt.sign(payload, "sssshhhhhhhH!!", options); // this method is synchronous
}

module.exports = router;
