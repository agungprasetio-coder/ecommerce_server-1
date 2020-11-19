if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
const router = require('./routes')
const errorHandler = require('./middlewares/error-handler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(router)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`app running at port ${PORT}`)
})

module.exports = app