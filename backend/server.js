const app =require('./app.js')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database.js')
// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server down server due to Uncaught Exception`);
    process.exit(1)
})

//Config
dotenv.config({path: "backend/config/config.env"})

//connect DB

connectDatabase()

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


// Unhandled Promise Rejectioin

process.on("unhandledRejection",(err) => {
    console.log(`Error: ${err.stack}`);
    console.log(`Server down server due to Unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1)
    })
})