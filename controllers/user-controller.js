const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class Controller {
    static login(req, res, next){
        const { email, password } = req.body
        User.findOne({
            where:{email}
        })
            .then(user=>{
                if(!user){
                    throw {status: 400, msg: 'wrong email/password'}
                }else if(!comparePassword(password, user.password)){
                    throw {status: 400, msg: 'wrong email/password'}
                }else{
                    const access_token = signToken({id: user.id, email: user.email})
                    res.status(200).json({access_token}) 
                }
            })
            .catch(err=>{
                next(err)
            })
    }

}

module.exports = Controller