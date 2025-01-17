const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize 
const { User, Product } = require('../models')
const { signToken } = require('../helpers/jwt')


let access_token_admin
let access_token_customer
let id

beforeAll((done)=>{
    process.env.SECRET = 'abcdef';
    User.create({email: 'admin@mail.com', password: '123456', role: 'admin'})
        .then(user=>{
            access_token_admin = signToken ({id: user.id, email: user.email})
            return User.create({email: 'bukanadmin@mail.com', password: '123456'})
        })
        .then(user=>{
            access_token_customer = signToken ({id: user.id, email: user.email})
            const newProduct = {
                name: 'Nokia 6.1 Plus Blue Edition',
                image_url: 'https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1',
                price: 24000000,
                stock: 10
            }
            return Product.create(newProduct)
        })
        .then(product=>{
            id = product.id
            done()
        })
        .catch(err=>{
            done(err)
        })
})

afterAll((done)=>{
    queryInterface.bulkDelete('Users', null, {})
        .then(()=>{
            queryInterface.bulkDelete('Products', null, {})
            done()
        })
        .catch(err=>{
            done(err)
        })
})


describe('GET /products', ()=>{
    it('tes get all products success', (done)=>{
        request(app)
        .get('/products')
        .set('access_token', access_token_admin)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('data')
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('tes get all products failed (no access token)', (done)=>{
        request(app)
        .get('/products')
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Please login first!')
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
})

describe('POST /products', ()=>{
    const newProduct = {
        name: 'Nokia 6.1 Plus',
        image_url: 'https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1',
        price: 2400000,
        stock: 5
    }
    it('tes add success', (done)=>{           
        request(app)
        .post('/products')
        .send(newProduct)
        .set('access_token', access_token_admin)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('msg', `${newProduct.name} has been added`)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('tes add failed (no access token)', (done)=>{
        request(app)
        .post('/products')
        .send(newProduct)
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Please login first!')
            done()
        })
        .catch(err=>{
            done(err)
        }) 
    })

    it('tes add failed (any access token but not an admin)', (done)=>{
        request(app)
        .post('/products')
        .send(newProduct)
        .set('access_token', access_token_customer)
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'Please login as Admin!')
            done()
        })
        .catch(err=>{
            done(err)
        }) 
    })

    it('tes add failed (required fields are empty)', (done)=>{
        const newProduct = {
            name: '',
            image_url: '',
            price: '',
            stock: '',
        }
        request(app)
        .post('/products')
        .send(newProduct)
        .set('access_token', access_token_admin)
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Name is required!, Image url is required!, Please use url format!, Price must number!, Stock must number!')
            done()
        })
        .catch(err=>{
            done(err)
        }) 
    })

    it('tes add failed (filling stock with minus number)', (done)=>{
        const newProduct = {
            name: 'Nokia 6.1 Plus',
            image_url: 'https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1',
            price: 2400000,
            stock: -1,
        }
        request(app)
        .post('/products')
        .send(newProduct)
        .set('access_token', access_token_admin)
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', `Stock can't under zero!`)
            done()
        })
        .catch(err=>{
            done(err)
        }) 
    })

    it('tes add failed (filling price with minus number)', (done)=>{
        const newProduct = {
            name: 'Nokia 6.1 Plus',
            image_url: 'https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1',
            price: -2400000,
            stock: 5,
        }
        request(app)
        .post('/products')
        .send(newProduct)
        .set('access_token', access_token_admin)
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', `Price can't under zero!`)
            done()
        })
        .catch(err=>{
            done(err)
        }) 
    })
})

describe('PUT /products', ()=>{
    const updateProduct = {
        name: 'Nokia 6.1 Plus',
        image_url: 'https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1',
        price: 2000000,
        stock: 2,
    }
    it('tes update product success', (done)=>{
        request(app)
        .put(`/products/${id}`)
        .send(updateProduct)
        .set('access_token', access_token_admin)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('msg', `${updateProduct.name} has been updated` )
            done()
        })
        .catch(err=>{
            done(err)
        })        
    })

    it('tes update product failed (no access token)', (done)=>{
        request(app)
        .put(`/products/${id}`)
        .send(updateProduct)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', `Please login first!` )
            done()
        })
        .catch(err=>{
            done(err)
        })        
    })

    it('tes update product failed (any access token but not admin)', (done)=>{
        request(app)
        .put(`/products/${id}`)
        .send(updateProduct)
        .set('access_token', access_token_customer)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', `You not allowed to do this action` )
            done()
        })
        .catch(err=>{
            done(err)
        })        
    })

    it('tes update product failed (filling stock with minus number)', (done)=>{
        const updateProductStockMinus = {
            name: 'Nokia 6.1 Plus',
            image_url: 'https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1',
            price: 2000000,
            stock: -2,
        }
        request(app)
        .put(`/products/${id}`)
        .send(updateProductStockMinus)
        .set('access_token', access_token_admin)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', `Stock can't under zero!`)
            done()
        })
        .catch(err=>{
            done(err)
        })        
    })

    it('tes update product failed (filling price with minus number)', (done)=>{
        const updateProductPriceMinus = {
            name: 'Nokia 6.1 Plus',
            image_url: 'https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1',
            price: -2000000,
            stock: 2,
        }
        request(app)
        .put(`/products/${id}`)
        .send(updateProductPriceMinus)
        .set('access_token', access_token_admin)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', `Price can't under zero!`)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('tes update product failed (filling price with string characters)', (done)=>{
        const updateProductStringPrice = {
            name: 'Nokia 6.1 Plus',
            image_url: 'https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1',
            price: 'dua juta',
            stock: 2,
        }
        request(app)
        .put(`/products/${id}`)
        .send(updateProductStringPrice)
        .set('access_token', access_token_admin)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', `Price must number!`)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('tes update product failed (filling stock with string characters)', (done)=>{
        const updateProductStringPrice = {
            name: 'Nokia 6.1 Plus',
            image_url: 'https://i1.wp.com/nokiamob.net/wp-content/uploads/2018/08/Nokia-6.1-Plus-final.jpg?fit=1600%2C1600&ssl=1',
            price: 2000000,
            stock: 'lima',
        }
        request(app)
        .put(`/products/${id}`)
        .send(updateProductStringPrice)
        .set('access_token', access_token_admin)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', `Stock must number!`)
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
})

describe('DELETE /products', ()=>{
    it('tes delete success', (done)=>{
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token_admin)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('msg', 'Product has been deleted')
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('tes delete failed (no access token)', (done)=>{
        request(app)
        .delete(`/products/${id}`)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'Please login first!')
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
    
    it('tes delete failed (any access token but not admin)', (done)=>{
        request(app)
        .delete(`/products/${id}`)
        .set('access_token', access_token_customer)
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg', 'You not allowed to do this action')
            done()
        })
        .catch(err=>{
            done(err)
        })
    }) 
})