const jwt = require('jsonwebtoken')

function signToken(token){
    let access_token = jwt.sign(token, 'erhaes');
    return access_token
}

function verifyToken(token){
    const decoded = jwt.verify(token, 'erhaes');
    return decoded
}

module.exports = {
    signToken, verifyToken
}