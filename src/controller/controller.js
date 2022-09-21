

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

let getAllStudent = async (req, res) => {
    try {
        let data = await Service.getAllStudent()
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

let deleteSv = async (req, res) => {
    let result = await Service.deleteSv(req.body.id)
    res.json(result)

}

let login = async (req, res) => {
    let result = await Service.login(req.body)
    // console.log(result)
    res.json(result)
}

let createAccount = async (req, res) => {
    let result = await Service.createAccount(req.body)
    res.json(result)
}

module.exports = {
    reateOneSV,
    getAllStudent,
    editSv,
    deleteSv,
    login,
    createAccount
}