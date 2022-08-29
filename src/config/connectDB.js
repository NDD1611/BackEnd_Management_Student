
const mongoose = require("mongoose")

let connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/QLSV');
        console.log("Connect DB successfully!")
    } catch (err) {
        console.log("Error, connect DB")
    }
}

module.exports = connectDB;