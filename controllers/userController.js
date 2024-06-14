// //
// const {v4: uuidv4} = require("uuid")
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
    //         email : userData.email,
    //         password: userData.password
    //     }
    // });
}


// Handle Login User.
async function userLogin(req, resp) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return resp.status(400).json({ error: "Please fill out the form" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            const isMatch = await bcrypt.compare(password, userExist.password);

            if (!isMatch) {
                return resp.status(400).json({ error: "Invalid credentials (password)!" });
            }

            const token = setUser(userExist); // Generate JWT token
            return resp.json({ message: "User logged in successfully!", token });

        } else {
            return resp.status(400).json({ error: "Invalid credentials (email)!" });
        }

    } catch (error) {
        console.error('Server error:', error);
        return resp.status(500).json({ error: "An error occurred. Please try again later." });
    }
}


// //Upload File
function handleUpload(req, resp, cd) {
    // console.log(req);
    if (!req.file) {
        return resp.status(400).send({ error: "No file uploaded" });
    }
    resp.status(200).send({
        message: "File uploaded successfully",
        file: req.file
    });
}



module.exports = {
    userSignup, userLogin, handleUpload
}