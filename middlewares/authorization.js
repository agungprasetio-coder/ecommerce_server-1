const {Product, User, Cart} = require('../models')
const Op = require('sequelize').Op

function adminAuthorization(req, res, next){
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

function customerAuthorization (req, res, next) {
    const email = req.loggedInUser.email
    const {id} = req.params
    //console.log(email, '<<<<<< isi dari req.loggedInUser.email di authorization')
    User.findOne({
        where:{
            [Op.and]:[{email}, {role: 'customer'}]
        }
    })
        .then(user=>{
            if(!user){
                throw {status: 401, msg: 'You not allowed to do this action'}
            }else{
                //console.log('email-nya ada dan role-nya admin silahkan lanjut ke product controller', '<<<< btw ini pesan dari authorization')
                return Cart.findByPk(id)
            }
        })
        .then(cart=>{
            //console.log(cart, '<<<<< ini kalo cart ada di author')
            if(!cart){
                throw {status: 404, msg: `Cart id ${id} not found`}
            }else if(cart.UserId !== req.loggedInUser.id){
                throw {status: 401, msg: 'You not allowed to do this action'}
            }else {
                req.CartId = cart.id
                //console.log(req.CartId, '<<<< cart id di authorization')
                next()
            }
        })
        .catch(err=>{
            next(err)
        })
}

module.exports = {
    adminAuthorization, customerAuthorization
}