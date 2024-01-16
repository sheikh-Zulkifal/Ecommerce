const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

const errorMiddleware = require('../backend/middlewares/error.js')

app.use(express.json())
app.use(cookieParser())

//Route import
const product = require('./routes/productRoute.js')
const user = require('../backend/routes/userRoute.js')

app.use("/api/v1",product)
app.use("/api/v1", user)

// Middleware for error

app.use(errorMiddleware)

module.exports = app