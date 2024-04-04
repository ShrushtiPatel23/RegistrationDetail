const mongoose = require('mongoose');
const dotenv = require("dotenv").config()

const mongoURI = process.env.MONGODB_URL 


const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;
