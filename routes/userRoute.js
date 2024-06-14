// // //
// const express = require("express")
// const { userSignup, userLogin, } = require('../controllers/userController')

// const router = express.Router()


// router.post('/signup', userSignup)
// router.post('/login', userLogin)
// // router.get('/getapi', tryAPI)


// module.exports = router




// // --------------------- Try --------------------------- // //
const express = require("express");
const multer = require("multer")
const { userSignup, userLogin, handleUpload } = require('../controllers/userController');
const { loggedInUserOnly } = require('../middlewares/middleware_auth');
const { uploadFileMiddleware } = require("../middlewares/uploadFileMiddleware");

const router = express.Router();


router.post('/signup', userSignup);
router.post('/login', userLogin);
router.post('/upload', uploadFileMiddleware, handleUpload)

// Protected route example
router.get('/protected', loggedInUserOnly, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;