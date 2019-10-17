let app = require('../app')
let chai = require('chai')
let chaihttp = require('chai-http')
let mongoose = require('mongoose')

const { expect } = chai
chai.use(chaihttp)
before (done => {
    mongoose.connect('mongodb://127.0.0.1:27017/testshopline', () => {
        mongoose.connection.db.dropDatabase()
    })
    done()
})

describe('This suit handles tests for users endpoints', () => {
    it('signup users -> correct way', done => {
        chai.request(app).post('/api/v1/users/signup').set('Accept', 'application/json').send({
            firstname: 'Deogratius',
            lastname: 'Bagenda',
            email: 'example@address.com',
            contact: '0700558588',
            password: 'password'
        }).end((err, res) => {
            expect(res.status).to.equal(201)
            expect(res.body.success).to.equal(true)
            expect(res.body.message).to.equal('user created sucessfully')
            expect(res.body.data.firstname).to.equal('deogratius')
            expect(res.body.data.lastname).to.equal('bagenda')
            expect(res.body.data.email).to.equal('example@address.com')
            expect(res.body.data.contact).to.equal('0700558588')
            done()
        })
    })

    it('signup users -> create user again', done => {
        chai.request(app).post('/api/v1/users/signup').set('Accept', 'application/json').send({
            firstname: 'Deogratius',
            lastname: 'Bagenda',
            email: 'example@address.com',
            contact: '0700558588',
            password: 'password'
        }).end((err, res) => {
            expect(res.status).to.equal(409)
            expect(res.body.success).to.equal(false)
            expect(res.body.message).to.equal('email already exists')
            done()
        })
    })

    it('signup users -> password missing', done => {
        chai.request(app).post('/api/v1/users/signup').set('Accept', 'application/json').send({
            firstname: 'Deogratius',
            lastname: 'Bagenda',
            email: 'example@address.com',
            contact: '0700558588',
        }).end((err, res) => {
            expect(res.status).to.equal(422)
            expect(res.body.message).to.equal('password is missing or empty.')
            done()
        })
    })

    it('signup users -> numerical firstname', done => {
        chai.request(app).post('/api/v1/users/signup').set('Accept', 'application/json').send({
            firstname: 12345678,
            lastname: 'Bagenda',
            email: 'example@address.com',
            contact: '0700558588',
            password: "password"
        }).end((err, res) => {
            expect(res.status).to.equal(422)
            expect(res.body.message).to.equal('firstname should be a string.')
            done()
        })
    })

    it('login users -> correct way', done => {
        chai.request(app).post('/api/v1/users/login').set('Accept', 'application/json').send({
            email: 'example@address.com',
            password: "password"
        }).end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.success).to.equal(true)
            expect(res.body.message).to.equal('user logged in successfully')
            done()
        })
    })

    it('login users -> wrong password', done => {
        chai.request(app).post('/api/v1/users/login').set('Accept', 'application/json').send({
            email: 'example@address.com',
            password: "passwor"
        }).end((err, res) => {
            expect(res.status).to.equal(401)
            expect(res.body.success).to.equal(false)
            expect(res.body.message).to.equal('wrong password, try again')
            done()
        })
    })

    it('login users -> user not found', done => {
        chai.request(app).post('/api/v1/users/login').set('Accept', 'application/json').send({
            email: 'exampe@address.com',
            password: "password"
        }).end((err, res) => {
            expect(res.status).to.equal(404)
            expect(res.body.success).to.equal(false)
            expect(res.body.message).to.equal('user not found')
            done()
        })
    })

    it('get all users -> correct way', done => {
        chai.request(app).get('/api/v1/users').set('Accept', 'application/json').end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.success).to.equal(true)
            expect(res.body.message).to.equal('users retrieved successfully')
            done()
        })
    })

    it('get single user -> correct way', done => {
        chai.request(app).get('/api/v1/users').set('Accept', 'application/json').end((err, res) => {
            let userid = res.body.data[0]._id
            chai.request(app).get(`/api/v1/users/${userid}`).set('Accept', 'application/json').end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.success).to.equal(true)
                expect(res.body.message).to.equal('user found successfully')
            })
            done()
        })
    })

    it('get single user -> non existing user id', done => {
        chai.request(app).get('/api/v1/users').set('Accept', 'application/json').end((err, res) => {
            let userid = "5da7b7a2783d0d2644ec7e12"
            chai.request(app).get(`/api/v1/users/${userid}`).set('Accept', 'application/json').end((err, res) => {
                expect(res.status).to.equal(404)
                expect(res.body.success).to.equal(false)
                expect(res.body.message).to.equal('user not found')
            })
            done()
        })
    })

    it('update user -> correct way', done => {
        chai.request(app).get('/api/v1/users').set('Accept', 'application/json').end((err, res) => {
            let userid = res.body.data[0]._id
            chai.request(app).put(`/api/v1/users/${userid}`).set('Accept', 'application/json').send({
                lastname: 'joseph',
                firstname: 'kyelu'
            }).end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.success).to.equal(true)
                expect(res.body.data.lastname).to.equal('joseph')
                expect(res.body.message).to.equal('user updated successfully')
                done()
            })
        })
    })

    it('update user -> user not found', done => {
        let userid = "5da7b7a2783d0d2644ec7e12"
        chai.request(app).put(`/api/v1/users/${userid}`).set('Accept', 'application/json').send({
            lastname: 'joseph',
            firstname: 'kyelu'
        }).end((err, res) => {
            expect(res.status).to.equal(404)
            expect(res.body.success).to.equal(false)
            expect(res.body.message).to.equal('user not found')
            done()
        })
    })

    it('delete user -> correct way', done => {
        chai.request(app).get('/api/v1/users').set('Accept', 'application/json').end((err, res) => {
            let userid = res.body.data[0]._id
            chai.request(app).delete(`/api/v1/users/${userid}`).set('Accept', 'application/json').end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body.success).to.equal(true)
                expect(res.body.message).to.equal('user is deleted successfully')
                done()
            })
        })
    })
})
