// //
const bcrypt = require('bcrypt');
const User = require('../model/user')
const { setUser, } = require('../services/auth')

// // Handle Signup User.
async function userSignup(req, resp) {

    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create({
        name: name, email: email, password: hashedPassword
    })

    await userData.save()
    resp.status(201).json({ message: "user registered successfull !" })

    // // or

    // return resp.status(201).send({
    //     message: "User registered successfully",
    //     user: {
    //         name: userData.name,
    //         email: userData.email,
    //         password: userData.password
    //     }
    // });
}

// Handle Login User.
async function userLogin(req, resp) {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return resp.status(400).json({ error: "Please feelup the form" })
        }

        const userLoggedIn = await User.findOne({ email: email })

        if (userLoggedIn) {

            const isMatch = await bcrypt.compare(password, userLoggedIn.password)

            if (!isMatch) {
                resp.status(400).json({ Error: "Invelid Credientials password !" })
            } else {
                resp.json({ message: "User Logged In Successfullly !" })
            }

        } else {
            resp.status(400).json({ Error: "Invelid Credientials email !" })
        }

        console.log(userLoggedIn);

    } catch (error) {

    }

}


module.exports = {
    userSignup, userLogin, 
}