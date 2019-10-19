let jwt = require('jsonwebtoken')

const errorMessage = (res, code, message, boolean, data = false) => {
    if (data == false)
        return res.status(code).json({
            success: boolean,
            message: message
        })
    return res.status(code).json({
        success: boolean,
        message: message,
        data
    })
}

const jwtAuthentication = (res, token, secret, isAdmin) => {
    try{
        let jwtauth = jwt.verify(token, secret)
        if(jwtauth){
            if(isAdmin && jwtauth.isAdmin){
                return false
            }else if(isAdmin && !jwtauth.isAdmin){
                return errorMessage(res, 409, 'Only admin should access this endpoint', false)
            }else{
                return false
            }
        }
        return errorMessage(res, 400, 'Invalid token', false)
    }catch(err){
        return errorMessage(res, 500, err.message, false)
    }
}
module.exports = {errorMessage:errorMessage, jwtAuthentication: jwtAuthentication}
