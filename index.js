const server = require('./api/server.js');
const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

server.use(authRouter)
server.use("/", jokesRouter)

const PORT = process.env.PORT || 3300;



module.exports = server;