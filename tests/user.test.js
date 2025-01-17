const request = require('supertest')
const bcrypt = require('bcryptjs')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const { User } = require('../models')
const { hashPassword } = require('../helpers/bcrypt')
const app = require('../app')

const listUsers = [
    {email: 'admin@mail.com', password: '123456', role: 'admin'},
    {email: 'customer@mail.com', password: '654321'}
]

const users = listUsers.filter(user=>{
    if(!user.role){
        user.role = 'customer'
    }
    user.password = hashPassword(user.password)
    user.createdAt = new Date()
    user.updatedAt = new Date()
    return user
})

beforeAll((done)=>{
    process.env.SECRET = 'abcdef';
    queryInterface.bulkInsert('Users', users, {})
        .then(()=>{
            done()
        })
        .catch(err=>{
            done(err)
        })
})

afterAll((done)=>{
    queryInterface.bulkDelete('Users')
        .then(()=>{
            done()
        })
        .catch(err=>{
            done(err)
        })
})

describe('POST /login', ()=>{
    it('tes login success', (done)=>{
        // jest.spyOn(User, 'findOne').mockResolvedValue({email: 'admin@mail.com', password: '123456', role: 'admin'})
        // jest.spyOn(bcrypt, 'compareSync').mockResolvedValue(true)
        request(app)
        .post('/login')
        .send({email: 'admin@mail.com', password: '123456'})
        .then(response=>{
            const {status, body} = response
            expect(status).toBe(200)
            expect(body).toHaveProperty('access_token', expect.any(String))
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('tes login failed (wrong email)', (done)=>{
        request(app)
        .post('/login')
        .send({email: 'bukanmain@mail.com', password:'123456'})
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'wrong email/password')
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('tes login failed (wrong password)', (done)=>{
        request(app)
        .post('/login')
        .send({email: 'admin@mail.com', password:'bukanmain'})
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'wrong email/password')
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    it('tes login failed (email & password is empty)', (done)=>{
        request(app)
        .post('/login')
        .send({email: '', password: ''})
        .then(response=>{
            const { status, body } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg', 'wrong email/password')
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
})