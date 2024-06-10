// 
const mongoose = require('mongoose')

const connectMongo = async (url) => {
    return mongoose.connect(url)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log("Error:", err))
}

module.exports = connectMongo
