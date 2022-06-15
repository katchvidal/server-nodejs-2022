const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const PORT = 3000
const api = process.env.API_CONSTANTS

//  Call Routes
const productRoutes = require('./routers/product')

//  Middleware
app.use(express.json())
app.use(morgan('tiny'))

//  Routers
app.use(`${api}/products`, productRoutes)

//  Database Connection
const MOGONURI = process.env.MONGOCDN
mongoose
    .connect(MOGONURI)
    .then(() => {
        console.log('Database Connection is ready')
    })
    .catch((err) => {
        console.log(err)
    })

// Server Working
app.listen(PORT, () => {
    console.log(`sever is running at http://localhost:${PORT}`)
})
