// server.js file

const server = require('./api/index')()
const config = require('./api/configs/config/config')
const db = require('./api/configs/db')

// create the basic server setup
server.create(config, db)

// start the server
server.start()
let app = server.app
module.exports = app
