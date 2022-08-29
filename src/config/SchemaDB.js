
const mongoose = require("mongoose")

const { Schema } = require("mongoose")

let infoSvSchema = new Schema({
    masv: String,
    password: String,
    name: String,
    date: String,
    gender: Number,
    email: String,
    address: String,
    phone: String,
    role: String,
    diemtb: Number,
    tinchi: Number,
    namePa: String,
    nameMe: String,
    phonePa: String,
    phoneMe: String,
    jobPa: String,
    jobMe: String,
    addressPa: String,
    addressMe: String
})

const infoSvModel = mongoose.model('infosv', infoSvSchema)

module.exports = {
    infoSvModel
}