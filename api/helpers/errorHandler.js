export function errorMessage(res, code, message, boolean, data = false) {
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
