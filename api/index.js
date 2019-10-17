// express application

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

module.exports = () => {
    let app = express(), create, start

    create = (config, db) => {
        let routes = require('./routes')

        // set all server params
        app.set('env', config.env)
        app.set('port', config.port)
        app.set('hostname', config.hostname)

        // add middleware to parse the json data
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))

        // connect to mongo database
        mongoose.connect(
            db.database,
            { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
        )

        // setup routes
        routes.init(app)
    }

    start = () => {
        let hostname = app.get('hostname'),
        port = app.get('port')
        app.listen(port, () => {
            console.log('Server running on http://' + hostname + ':' + port)
        })
    }
    return { create, start, app }
}
