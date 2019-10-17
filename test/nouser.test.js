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
    it('get all users -> no user found', done => {
        chai.request(app).get('/api/v1/users').set('Accept', 'application/json').end((err, res) => {
            expect(res.status).to.equal(404)
            expect(res.body.success).to.equal(false)
            expect(res.body.message).to.equal('no user found.')
            done()
        })
    })

    it('get single user -> invalid user id', done => {
        chai.request(app).get('/api/v1/users/sss').set('Accept', 'application/json').end((err, res) => {
            expect(res.status).to.equal(404)
            expect(res.body.success).to.equal(false)
            expect(res.body.message).to.equal('use a valid user id')
            done()
        })
    })

    it('update user -> invalid user id', done => {
        chai.request(app).put('/api/v1/users/sss').set('Accept', 'application/json').send({
            lastname: 'joseph'
        }).end((err, res) => {
            expect(res.status).to.equal(404)
            expect(res.body.success).to.equal(false)
            expect(res.body.message).to.equal('use a valid user id')
            done()
        })
    })

    it('update user -> invalid user id', done => {
        chai.request(app).delete('/api/v1/users/sss').set('Accept', 'application/json').end((err, res) => {
            expect(res.status).to.equal(404)
            expect(res.body.success).to.equal(false)
            expect(res.body.message).to.equal('use a valid user id')
            done()
        })
    })
})
