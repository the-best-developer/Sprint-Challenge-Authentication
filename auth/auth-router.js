const router = require('express').Router();
const bcrypt = require('bcryptjs')
const usersDb = require('../database/dbConfig.js');

router.post('/register', async (req, res) => {
  const addUser = req.body;

  try{
      (!newUser.username || !newUser.password || !newUser.department) &&
        res.status(500).json({message: "missing username, password, or department"});

      addUser.password = bcrypt.hashSync(addUser.password, 14);
      const addedUser = await usersDb('users').insert(newUser);
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
      (!user.username || !user.password) &&
        res.status(500).json({message: "missing username or password"})
      
      const selectedUser = await usersDb('users').where({ username: user.username }).first();
      
      (!bcrypt.compareSync(user.password, selectedUser.password)) &&
        res.status(500).json({message: "Incorrect password"})

      const token = Auth.generateToken(user);
      
      return res.status(200).json({message: `Logged in as ${selectedUser.username}!`, token: token })
  }
  catch (err) {
      return res.status(500).json({err: err.message})
  }
});

module.exports = router;
