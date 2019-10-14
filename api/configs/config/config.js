// config file

const _ = require('lodash')
const dotenv = require('dotenv')
dotenv.config()
const env = process.env.NODE_ENV || 'local'
const screteKey = process.env.SCRETE_KEY
const envConfig = require('./' + env)
let defaultConfig = { env }

module.exports = _.merge(defaultConfig, envConfig, {screteKey})
