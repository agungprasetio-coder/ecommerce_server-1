const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

async function authentication(req, res, next){
    const {access_token} = req.headers
    try{
        if(!access_token){
            throw {status: 400, msg: 'Please login first!'}
        }else{
            let decoded = verifyToken(access_token)
            const user = await User.findOne({where:{email: decoded.email}})
            if(!user){
                throw {status: 400, msg: 'Please login first!'}
            }else{
                req.loggedInUser = decoded
                next()
            } 
        }
    }catch(err){
        next(err)
    }
}

async function adminAuthentication(req, res, next){
    const {access_token} = req.headers
    try{
        if(!access_token){
            throw {status: 400, msg: 'Please login first!'}
        }else{
            let decoded = verifyToken(access_token)
            const user = await User.findOne({where:{email: decoded.email}})
            if(!user){
                throw {status: 400, msg: 'Please login first!'}
            }else{
                if(user.role !== 'admin'){
                    throw {status: 401, msg: 'Please login as Admin!'}       
                }else{
                    req.loggedInUser = decoded
                    next()
                }
            } 
        }
    }catch(err){
        next(err)
    }
}

async function customerAuthentication(req, res, next){
    const {access_token} = req.headers
    try{
        if(!access_token){
            throw {status: 400, msg: 'Please login first!'}
        }else{
            let decoded = verifyToken(access_token)
            const user = await User.findOne({where:{email: decoded.email}})
            if(!user){
                throw {status: 400, msg: 'Please login first!'}
            }else{
                if(user.role !== 'customer'){
                    throw {status: 401, msg: 'Please login as Customer!'}       
                }else{
                    req.loggedInUser = decoded
                    next()
                }
            } 
        }
    }catch(err){
        next(err)
    }
}

module.exports = {
    authentication, adminAuthentication, customerAuthentication 
}