// //
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectMongo = require('./connection')
const router = require('./routes/userRoute')
const { loggedInUserOnly,
    //  checkAuth
     } = require('./middlewares/middleware_auth')

const app = express()

// // Middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// // Route-Middlewares
// app.use('/', checkAuth, staticRoute)
app.use('/login', loggedInUserOnly, router)

// // Route
app.use(router)
// //Connect MongoDB
connectMongo('mongodb://localhost:27017/signup-user')


app.listen(5000, () => console.log("Server Started at Port:5000 !"))