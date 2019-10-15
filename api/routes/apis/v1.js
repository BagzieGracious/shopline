// v1 file

const express = require('express')
const userController = require('../../controllers/user')

let router = express.Router()
router.use('/users', userController)
module.exports = router
