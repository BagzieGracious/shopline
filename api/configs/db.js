let config = require('./config/config')

let database
if(config.env === 'local'){
    database = 'mongodb://127.0.0.1:27017/shopline'
}else{
    database = 'mongodb://127.0.0.1:27017/testshopline'
}
module.exports = {
    'secrete': 'secrerecode',
    'database': database
}
