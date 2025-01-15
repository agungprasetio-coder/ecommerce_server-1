const {Cart, Product} = require('../models')
const Op = require('sequelize').Op

class Controller {
    static addToCart(req, res, next) {
        const ProductId = req.params.id
        const UserId = req.loggedInUser.id
        let newCart = {
            ProductId,
            UserId
        }

        Cart.findOrCreate({
            where: newCart,
            defaults: {quantity: 1},
            include: [Product]
        })
            .then(cart=>{
                if(!cart[1] && cart[0].quantity < cart[0].Product.stock){
                    let currentQuantity = cart[0].quantity + 1
                    return Cart.update({quantity: currentQuantity},{
                        where:{
                            [Op.and]: [{ProductId}, {UserId}]
                        },
                        returning: true
                    })
                }else if(!cart[1] && (cart[0].quantity + 1) > cart[0].Product.stock){
                    throw {status: 403, msg: 'Not enough stock!'}
                }
                else{
                    res.status(201).json({cart})
                }
            })
            .then(cart=>{
                res.status(200).json({cart: cart[1]})
            })
            .catch(err=>{
                next(err)
            })
    }

    static listOfCarts(req, res, next) {
        Cart.findAll({
            where:{UserId: req.loggedInUser.id},
            include: [Product],
            order: [['createdAt', 'DESC']]
        })
            .then(carts=>{
                res.status(200).json({carts})
            })
            .catch(err=>{
                next(err)
            })
    }

    static updateCart(req, res, next) {
        const {id} = req.params
        const {quantity} = req.body
        let updateCart = {
            quantity
        }
        Cart.findByPk(id,{
            include: [Product]
        })
            .then(cart=>{
                if(quantity > cart.Product.stock){
                    throw {status: 403, msg: 'Not enough stock!'}
                }else{
                    return Cart.update(updateCart,{
                        where: {id},
                        returning: true
                    })
                }
            }) 
            .then(cart=>{
                res.status(200).json({cart: cart[1][0]})
            })
            .catch(err=>{
                next(err)
            })
    }

    static deleteCart(req, res, next) {
        const id = req.CartId
        Cart.destroy({where:{id}})
            .then(cart=>{
                res.status(200).json({msg: 'Your product has removed from cart'})
            })
            .catch(err=>{
                next(err)
            })
    }
}

module.exports = Controller