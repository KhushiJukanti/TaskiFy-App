const mongoose = require("mongoose")

let authShema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    repassword:String,
})

module.exports = mongoose.model("auth",authShema)