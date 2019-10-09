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
        required: [true, 'lastname is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    contact: {
        type: String,
        required: [true, 'contact is required']
    },
    photo: {
        type: String
    },
    gender: {
        type: String
    },
    address: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('User', User)
