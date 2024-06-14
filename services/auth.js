// //
// ------------------------------- Cookies ------------------------------- //

// const sessionIdToUserMap = new Map()

// function setUser(id, user) {
//     return sessionIdToUserMap.set(id, user)
// }

// function getUser(id) {
//     return sessionIdToUserMap.get(id)
// }










// ------------------------------- JWT ------------------------------- //
// const jwt = require("jsonwebtoken")
// const secretKey = "299792458m/s"

// function setUser(user) {
//     const payload = { _id: user._id, email: user.email }
//     return jwt.sign(payload, secretKey)
// }

// function getUser(token) {
//     if (!token) return null
//     try {
//         return jwt.verify(token, secretKey)
//     } catch (error) {
//         return null
//     }
// }


// module.exports = {
//     setUser, getUser
// } 



// // ---------------------- Try --------------------------------- // // 
const jwt = require("jsonwebtoken");
const secretKey = "299792458m/s";

function setUser(user) {
    const payload = { _id: user._id, email: user.email };
    return jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser, getUser
};