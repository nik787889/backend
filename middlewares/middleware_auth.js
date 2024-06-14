// // //
// const { getUser } = require("../services/auth")


// async function loggedInUserOnly(req, resp, next) {
//     const userUid = req.cookies?.uid
//     if (!userUid) return resp.redirect('/login')

//     const user = getUser(userUid)
//     if (!user) return resp.redirect('/login')

//     req.user = user
//     next()
// }


// // async function checkAuth(req, resp, next) {
// //     const userUid = req.cookies?.uid
// //     const user = getUser(userUid)
// //     req.user = user
// //     next()
// // }


// module.exports = {
//     loggedInUserOnly,
//     //  checkAuth, 
// }




// ----------------------- Try ------------------------ //
const { getUser } = require('../services/auth');

async function loggedInUserOnly(req, resp, next) {

    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) return resp.status(401).json({ error: "Unauthorized" });

    const user = getUser(token);
    if (!user) return resp.status(401).json({ error: "Unauthorized" });

    req.user = user;
    next();
}

module.exports = {
    loggedInUserOnly,
};