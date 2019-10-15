// user model

let mongoose = require('mongoose')
let schema = mongoose.Schema

let User = new schema({
    firstname: {
        type: String,
        required: [true, 'firstname is required'],
        lowercase: true
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    contact: {
        type: String,
        required: [true, 'contact is required'],
        lowercase: true
    },
    photo: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null,
        lowercase: true
    },
    address: {
        type: String,
        default: null,
        lowercase: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('User', User)
