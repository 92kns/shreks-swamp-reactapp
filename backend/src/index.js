// let's go!
require('dotenv').config({ path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use express middleware to handle cookies <jwt>
// TODO use express middleweare to popul;ate current users

server.start(
    {
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL,
        },

},
deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);