let checkIfEmpty = data => {
    for (let field in data){
        if (data[field] === null || data[field] === undefined || data[field] === ''){
            return `${field} is missing or empty.`
        }
    }
    return false
}

let checkType = (data) => {
    for(let field in data){
        if (typeof data[field] !== "string"){
            return `${field} should be a string.`
        }
    }
    return false
}

const validate = data => {
    if(checkIfEmpty(data)){
        return checkIfEmpty(data)
    } else if(checkType(data)){
        return checkType(data)
    }
    return false
}

module.exports = {validate:validate}