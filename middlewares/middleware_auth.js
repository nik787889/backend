// //
const { getUser } = require("../services/auth")


async function loggedInUserOnly(req, resp, next) {
    const userUid = req.cookies?.uid
    if (!userUid) return resp.redirect('/login')

    const user = getUser(userUid)
    if (!user) return resp.redirect('/login')

    req.user = user
    next()
}


// async function checkAuth(req, resp, next) {
//     const userUid = req.cookies?.uid
//     const user = getUser(userUid)
//     req.user = user
//     next()
// }


module.exports = {
    loggedInUserOnly,
    //  checkAuth, 
}