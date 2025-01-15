const {Product, User, Cart} = require('../models')
const Op = require('sequelize').Op

function adminAuthorization(req, res, next){
    const email = req.loggedInUser.email
    const {id} = req.params
    User.findOne({
        where:{
            [Op.and]:[{email: email}, {role: 'admin'}]
        }
    })
        .then(user=>{
            if(!user){
                throw {status: 401, msg: 'You not allowed to do this action'}
            }else{
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
    User.findOne({
        where:{
            [Op.and]:[{email}, {role: 'customer'}]
        }
    })
        .then(user=>{
            if(!user){
                throw {status: 401, msg: 'You not allowed to do this action'}
            }else{
                return Cart.findByPk(id)
            }
        })
        .then(cart=>{
            if(!cart){
                throw {status: 404, msg: `Cart id ${id} not found`}
            }else if(cart.UserId !== req.loggedInUser.id){
                throw {status: 401, msg: 'You not allowed to do this action'}
            }else {
                req.CartId = cart.id
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