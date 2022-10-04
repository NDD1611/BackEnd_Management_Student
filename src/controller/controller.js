

// const res = require("express/lib/response.js")
const Service = require("../service/service.js")

let reateOneSV = async (req, res) => {
    try {
        let infosv = {
            ...req.body
        }
        let response = await Service.createOneSvService(infosv)
        res.json(response)
    } catch (err) {
        console.log("Error, controller", err)
    }
}

let getAllStudentLop = async (req, res) => {
    try {
        let malop = req.body.malop
        let data = await Service.getAllStudentLop(malop)
        if (data) {
            res.json({
                errCode: 0,
                mes: "Get success",
                data: data
            })
        } else {
            res.json({
                errCode: 1,
                mes: "Not found data"
            })
        }
    } catch (err) {
        res.json({
            errCode: 3,
            mes: "Error, Server"
        })
    }
}

let editSv = async (req, res) => {
    let result = await Service.editSv(req.body)
    res.json(result)
}

let editCVHT = async (req, res) => {
    try {
        let result = await Service.editCVHT(req.body)
        res.json(result)
    } catch (err) {
        console.log('editCVHT', err)
    }
}

let deleteSv = async (req, res) => {
    // console.log(req.body)
    let result = await Service.deleteSv(req.body.id)
    if (result.errCode == 0) {
        await Service.deleteAccount(req.body.masv)
    }
    res.json(result)

}

let login = async (req, res) => {
    let result = await Service.login(req.body)
    // console.log(result)
    res.json(result)
}

let createAccount = async (req, res) => {
    try {
        let result = await Service.createAccount(req.body)
        res.json(result)
    } catch (err) {
        console.log("createAccout", err)
    }
}

let changePass = async (req, res) => {
    let result = await Service.changePass(req.body)
    console.log("controller", result)
    res.json(result)
}

let addClass = async (req, res) => {
    let result = await Service.addClass(req.body)
    console.log("controller", result)
    res.json(result)
}

let getAllClass = async (req, res) => {
    try {
        let result = await Service.getAllClass(req.body)
        res.json(result)

    } catch (err) {
        console.log("controleer getAllClass", err)
    }
}
module.exports = {
    reateOneSV,
    getAllStudentLop,
    editSv,
    deleteSv,
    login,
    createAccount,
    changePass,
    editCVHT,
    addClass,
    getAllClass
}