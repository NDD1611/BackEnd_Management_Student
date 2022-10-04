
const mongoose = require("mongoose")

const { Schema } = require("mongoose")

let infoSvSchema = new Schema({
    masv: String,
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
    addressMe: String,
    malop: String
})

let infoCVHTSchema = new Schema({
    macb: String,
    name: String,
    date: String,
    gender: Number,
    email: String,
    address: String,
    phone: String,
    role: String
})

let accountSchema = new Schema({
    name: String,
    username: String,
    password: String,
    role: String,
    malop: String
})

let lopHocSchema = new Schema({
    malop: String,
    macb: String,
    khoahoc: String,
    namhoc: String
})


const infoSvModel = mongoose.model('infosv', infoSvSchema)
const accountModel = mongoose.model('account', accountSchema)
const infoCVHTModel = mongoose.model('infocvht', infoCVHTSchema)
const lopHocModel = mongoose.model('lophoc', lopHocSchema)

module.exports = {
    infoSvModel,
    accountModel,
    infoCVHTModel,
    lopHocModel
}