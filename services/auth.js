// //
// ------------------------------- JWT ------------------------------- //
const jwt = require("jsonwebtoken")
const secretKey = "299792458m/s"

function setUser(user) {
    const payload = { _id: user._id, email: user.email, password: user.password }
    return jwt.sign(payload, secretKey)
    // return jwt.sign({ _id: user._id, email: user.email }, secretKey)
}

function getUser(token) {
    if (!token) return null
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        return null
    }
}


module.exports = {
    setUser, getUser
} 