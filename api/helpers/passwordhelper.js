const bcrypt = require('bcryptjs');

const cryptPassword = password => {
    let salt = bcrypt.genSaltSync(10)
    let passwordHash = bcrypt.hashSync(password, salt)
    return passwordHash
}

const passwordCompare = (password, passwordHash) =>{
    let compare = bcrypt.compareSync(password, passwordHash)
    return compare
}
module.exports = {cryptPassword: cryptPassword, passwordCompare: passwordCompare}