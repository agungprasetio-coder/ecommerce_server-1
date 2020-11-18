const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const ProductController = require('../controllers/product-controller')
const CartController = require('../controllers/cart-controller')
const {authentication, adminAuthentication, customerAuthentication} = require('../middlewares/authentication')
const {adminAuthorization, customerAuthorization} = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.post('/products', adminAuthentication, ProductController.postProduct)
router.get('/products', authentication, ProductController.getProducts)
router.put('/products/:id', authentication, adminAuthorization, ProductController.putProduct)
router.delete('/products/:id', authentication, adminAuthorization, ProductController.deleteProduct)

router.post('/carts/:id', customerAuthentication, CartController.addToCart)
router.get('/carts',  customerAuthentication, CartController.listOfCarts)
router.patch('/carts/:id', customerAuthentication, customerAuthorization, CartController.updateCart)
router.delete('/carts/:id', customerAuthentication, customerAuthorization, CartController.deleteCart)

module.exports = router