// user service file
const express = require('express')
let User = require('../../models/user')

const getUsers = async (req, res, next) => {
    try{
        let users = await User.find({})
        if(users.length > 0){
            return res.status(200).json({
                success: true,
                message: 'users retrieved sucessfully',
                users
            })
        }
        return res.status(404).json({
            success: false,
            message: 'no user found'
        })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const getUserById = async (req, res, next) => {
    try{
        let user = await User.findById(req.params.id)
        if(user){
            return res.status(200).json({
                success: true,
                message: 'user found sucessfully',
                user
            })
        }
        return res.status(404).json({
            success: false,
            message: 'user not found'
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const createUser = async (req, res, next) => {
    try{
        const { name, email } = req.body

        if(name === '' || name === null || name === undefined){
            return res.status(422).json({
                success: false,
                message: 'name is required'
            })
        }

        if(email === '' || email === null || email === undefined){
            return res.status(422).json({
                success: false,
                message: 'email is required'
            })
        }

        let isEmailExists = await User.findOne({ email })
        if(isEmailExists){
            return res.status(409).json({
                success: false,
                message: 'email already exists'
            })
        }

        const temp = { name, email }
        let newUser = await User.create(temp)

        if(newUser){
            return res.status(201).json({
                success: true,
                message: 'user created sucessfully',
                user: newUser
            })
        }
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const updateUser = async (req, res, next) => {
    try{
        const user = req.params.id
        const { name, email } = req.body

        if(name === '' || name === null || name === undefined){
            return res.status(422).json({
                success: false,
                message: 'name is required'
            })
        }

        if(email === '' || email === null || email === undefined){
            return res.status(422).json({
                success: false,
                message: 'email is required'
            })
        }

        let isUserExists = await User.findById(user)
        if(!isUserExists){
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        const temp = { name, email }
        let updateUser = await User.findByIdAndUpdate(user, temp, { new: true })
        if(updateUser){
            return res.status(200).json({
                success: true,
                message: 'user updated successfully'
            })
        }
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

const deleteUser = async (req, res, next) => {
    try{
        let user = await User.findByIdAndRemove(req.params.id)
        if(user){
            return res.status(200).json({
                success: true,
                message: `user with Id: ${req.params.id} is deleted successfully`
            })
        }
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'something went wrong'
        })
    }
}

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}
