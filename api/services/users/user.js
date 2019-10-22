// user service file
let User = require('../../models/user')
let jwt = require('jsonwebtoken')
let mongoose = require('mongoose')
let config = require('../../configs/config/config')
let passwordHelper = require('../../helpers/passwordhelper')
let fieldValidator = require('../../helpers/fieldvalidators')
let error = require('../../helpers/errorHandler')

// fuction that returns all users in the database
const getUsers = async (req, res) => {
    try{
        let users = await User.find({}, {password: 0})
        if(users.length > 0)
            return error.errorMessage(res, 200, 'users retrieved successfully', true, users)
        return error.errorMessage(res, 404, 'no user found.', false)
    }catch(err){
        return error.errorMessage(res, 500, err.message, false)
    }
}

// function gets a single user from the database
const getUserById = async (req, res) => {
    try{
        if (mongoose.Types.ObjectId.isValid(req.params.id)){
            let user = await User.findById(req.params.id)
            if(user)
                return error.errorMessage(res, 200, 'user found successfully', true, user)
            return error.errorMessage(res, 404, 'user not found', false)
        }
        return error.errorMessage(res, 404, 'use a valid user id', false)
    }catch(err){
        return error.errorMessage(res, 500, err.message, false)
    }
}

// function that creates a user
const createUser = async (req, res) => {
    try{
        const { firstname, lastname, contact, email, password } = req.body
        let data = { firstname, lastname, contact, email, password }

        // check for validity of data in request body
        if(fieldValidator.validate(data))
            return error.errorMessage(res, 422, fieldValidator.validate(data), false)

        // check if email exists in the database
        let isEmailExists = await User.findOne({ email })
        if(isEmailExists)
            return error.errorMessage(res, 409, 'email already exists', false)

        const temp = { firstname, lastname, contact, email, password: passwordHelper.cryptPassword(password) }
        let newUser = await User.create(temp)

        // check if user is added
        if(newUser)
            return error.errorMessage(res, 201, 'user created sucessfully', true, newUser)
    }catch(err){
        return error.errorMessage(res, 500, err.message, false)
    }
}

// fuction that updates users in the database
const updateUser = async (req, res) => {
    try{
        const user = req.params.id
        // check for validity of data in request body
        if(fieldValidator.validate(req.body))
            return error.errorMessage(res, 422, fieldValidator.validate(req.body), false)
        
        // check if email exists
        if (mongoose.Types.ObjectId.isValid(req.params.id)){
            let isUserExists = await User.findById(user)
            if(!isUserExists)
                return error.errorMessage(res, 404, 'user not found', false)

            // check if user is updated
            let updateUser = await User.findByIdAndUpdate(user, req.body, { new: true })
            if(updateUser)
                return error.errorMessage(res, 200, 'user updated successfully', true, updateUser)
        }
        return error.errorMessage(res, 404, 'use a valid user id', false)
    }catch(err){
        return error.errorMessage(res, 500, err.message, 500)
    }
}

// function that deletes a user
const deleteUser = async (req, res) => {
    try{
        if (mongoose.Types.ObjectId.isValid(req.params.id)){
            let user = await User.findByIdAndRemove(req.params.id)
            if(user)
                return error.errorMessage(res, 200, `user is deleted successfully`, true)
        }
        return error.errorMessage(res, 404, 'use a valid user id', false)
    }catch(err){
        return error.errorMessage(res, 500, err.message, false)
    }
}

// function that helps to login a user
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body
        let data = { email, password }

        // check if input data is valid
        if(fieldValidator.validate(data))
            return error.errorMessage(res, 422, fieldValidator.validate(data), false)

        // check if users with some email and password exists
        let isUserExists = await User.findOne({ email })
        if(isUserExists){
            let userdata = isUserExists.toObject()

            if(passwordHelper.passwordCompare(password, userdata['password'])){
                userdata['token'] = await jwt.sign({ 
                    email,
                    exp:  Math.floor(Date.now() / 1000) + (60 * 60),
                    admin: userdata['isAdmin']
                }, config.screteKey)
                delete userdata['password']
                return error.errorMessage(res, 200, 'user logged in successfully', true, userdata)
            }
            return error.errorMessage(res, 401, 'wrong password, try again', false)
        }
        return error.errorMessage(res, 404, 'user not found', false)
    }catch(err){
        return error.errorMessage(res, 500, err.message, false)
    }
}

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    loginUser: loginUser
}
