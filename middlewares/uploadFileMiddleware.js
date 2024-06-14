// //
const multer = require("multer")


// // Middleware for upload single file.
function uploadFileMiddleware(req, resp, next) {

    const storage = multer.diskStorage({    // // Multer disk storage configuration
        destination: function (req, file, cb) {
            return cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            return cb(null, `${Date.now()}-${file.originalname}`)
        }
    })

    const upload = multer({ storage })     // // Multer middleware configuration

    upload.single('profileImg')(req, resp, (err) => {
        if (err) {
            return resp.status(400).json({ error: err.message });
        }
        next()
    })

}



module.exports = {
    uploadFileMiddleware,
}