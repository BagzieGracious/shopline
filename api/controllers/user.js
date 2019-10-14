// user controler file

const express = require('express')
const userService = require('../services/users/user')

let router = express.Router()

router.get('/', userService.getUsers)
router.get('/:id', userService.getUserById)
router.post('/signup', userService.createUser)
router.post('/login', userService.loginUser)
router.put('/:id', userService.updateUser)
router.delete('/:id', userService.deleteUser)

module.exports = router
