const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const chalk = require('chalk')
require('dotenv').config()
const app = express()
const PORT = 3000
const api = process.env.API_CONSTANTS

//  Call Routes
const productRoutes = require('./routers/product')

//  Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.options('*', cors())

//  Routers
app.use(`${api}/products`, productRoutes)

//  Database Connection
const MOGONURI = process.env.MONGOCDN
mongoose
    .connect(MOGONURI)
    .then(() => {
        console.log(
            'Database Connection:',
            chalk.blueBright(`🚀 Ready & Working`)
        )
    })
    .catch((err) => {
        console.log(err)
    })

// Server Working
app.listen(PORT, () => {
    console.log(
        'Backend Server URL:',
        chalk.greenBright(
            `🚀 Server ready and listening at http://localhost:${PORT}`
        )
    )
})
