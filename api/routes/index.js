// index filein routes folder

const apiRoutes = require('./apis')

const init = app => {
    app.get('*', (req, res, next) => {
        console.log('Request was made to: ' + req.originalUrl)
        return next()
    })
    app.use('/api', apiRoutes)
}

module.exports = { init }
