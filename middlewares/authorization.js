const {Product, User} = require('../models')
const Op = require('sequelize').Op

function authorization(req, res, next){
    const email = req.loggedInUser.email
    const {id} = req.params
    //console.log(email, '<<<<<< isi dari req.loggedInUser.email di authorization')
    User.findOne({
        where:{
            [Op.and]:[{email: email}, {role: 'admin'}]
        }
    })
        .then(user=>{
            if(!user){
                throw {status: 401, msg: 'You not allowed to do this action'}
            }else{
                //console.log('email-nya ada dan role-nya admin silahkan lanjut ke product controller', '<<<< btw ini pesan dari authorization')
                return Product.findByPk(id)
            }
        })
        .then(product=>{
            if(!product){
                throw {status: 404, msg: `Product id ${id} not found`}
            }else{
                next()
            }
        })
        .catch(err=>{
            next(err)
        })
}

module.exports = authorization