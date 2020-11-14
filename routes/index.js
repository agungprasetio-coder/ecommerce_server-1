const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const ProductController = require('../controllers/product-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/login', UserController.login)
router.use(authentication)
router.post('/products', authorization, ProductController.postProduct)
router.get('/products', ProductController.getProducts)
router.put('/products/:id', authorization, ProductController.putProduct)
router.delete('/products/:id', authorization, ProductController.deleteProduct)

module.exports = router