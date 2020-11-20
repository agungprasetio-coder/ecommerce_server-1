const {Product} = require('../models')

class Controller {
    static postProduct(req, res, next){
        const {name, image_url, price, stock} = req.body
        const UserId = req.loggedInUser.id
        //console.log(UserId, name, image_url, price, stock, 'ini isi req body di post controller')
        let newProduct = {
            name,
            image_url,
            price,
            stock,
            UserId
        }
        Product.create(newProduct)
            .then(product=>{
                //console.log('kalo berhasil add product pesan ini harusnya muncul')
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
                //console.log(products, 'ini dari get di controller')
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
        //console.log(id, '<<<< ini req param di put product')
        const {name, image_url, price, stock} = req.body
        //console.log(name, image_url, price, stock, 'ini req body dari put product')
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
                //console.log(product[1][0].name, 'ini hasil dari put controller')
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