const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

async function authentication(req, res, next){
    const {access_token} = req.headers
    //console.log(access_token, 'ini isi req.headers di authentication')
    try{
        if(!access_token){
            throw {status: 400, msg: 'Please login first!'}
        }else{
            let decoded = verifyToken(access_token)
            //console.log(decoded, '<<<<<<< ini hasil verifytoken')
            const user = await User.findOne({where:{email: decoded.email}})
            if(!user){
                //console.log('kalo ngga lolos authentication harusnya pesan ini muncul', '<<<<<<<<<< dari authentication')
                throw {status: 400, msg: 'Please login first!'}
            }else{
                req.loggedInUser = decoded
                //console.log(req.loggedInUser, '<<<<<<<<<< ini req.loggedInUser dari authentication')
                next()
            } 
        }
    }catch(err){
        next(err)
    }
}

module.exports = authentication