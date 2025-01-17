const {Product} = require('../models')

class Controller {
    static postProduct(req, res, next){
        const {name, image_url, price, stock} = req.body
        const UserId = req.loggedInUser.id
        let newProduct = {
            name,
            image_url,
            price,
            stock,
            UserId
        }
        Product.create(newProduct)
            .then(product=>{
                res.status(201).json({msg: `${product.name} has been added`})
            })
            .catch(err=>{
                next(err)
            })
    }

    static getProducts(req, res, next){
        Product.findAll({
            attributes:{exclude:['createdAt', 'UserId', 'updatedAt']},
            order: [['updatedAt', 'DESC']]
        })
            .then(products=>{
                res.status(200).json({data: products})
            })
            .catch(err=>{
                next(err)
            })
    }

    static getProductById (req, res, next) {
        const { id } = req.params
        Product.findByPk(id)
            .then(product=>{
                res.status(200).json({data: product})
            })
            .catch(err=>{
                next(err)
            })
    }

    static putProduct(req, res, next){
        const {id} = req.params
        const {name, image_url, price, stock} = req.body
        let updateProduct = {
            name,
            image_url,
            price,
            stock
        }
        Product.update(updateProduct, {
            where: {id},
            returning: true
        })
            .then(product=>{
                res.status(200).json({msg: `${product[1][0].name} has been updated`})
            })
            .catch(err=>{
                next(err)
            })
    }

    static deleteProduct(req, res, next){
        const {id} = req.params
        Product.destroy({where:{id}})
            .then(product=>{
                res.status(200).json({msg: 'Product has been deleted'})
            })
            .catch(err=>{
                next(err)
            })
    }
}

module.exports = Controller