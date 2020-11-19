const jwt = require('jsonwebtoken')

function signToken(token){
    let access_token = jwt.sign(token, process.env.SECRET);
    return access_token
}

function verifyToken(token){
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded
}

module.exports = {
    signToken, verifyToken
}