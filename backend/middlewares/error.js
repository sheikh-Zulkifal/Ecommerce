const ErrorHandler = require('../utils/errorHandler.js')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    // Wrong Mongodb id error

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    // Mongoose Dublicate key error

    if (err.code === 11000) {
        const message = `Dublicate ${Object.keys(err.keyValue)} entered`        
        err = new ErrorHandler(message, 400)
    }

    //Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid, Try again`
        err = new ErrorHandler(message, 400)
    }

    // Jwt Expire Error

    if (err.name === "TokenExpiredError") {
        const message = `Json web token is Expired, Try again`
        err = new ErrorHandler(message, 400)
    }
    
    res.status(err.statusCode)
    .json({
        success: false,
        message: err.message        
    })
}