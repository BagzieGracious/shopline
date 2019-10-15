const bcrypt = require('bcryptjs');

export async function cryptPassword(password){
    let salt = await bcrypt.genSalt(6)
    let passwordHash = await bcrypt.hash(password, salt)
    return passwordHash
}

export async function passwordCompare(password, passwordHash){
    await bcrypt.compare(password, passwordHash).then(isMatch => {
        console.log(passwordHash)
        return isMatch
    })
}


