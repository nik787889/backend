// //
const express = require("express")
const { userSignup, userLogin, userExist, tryAPI } = require('../controllers/userController')

const router = express.Router()


router.post('/signup', userSignup)
router.post('/login', userLogin)
// router.get('/getapi', tryAPI)


module.exports = router

