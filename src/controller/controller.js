

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
    let result = await Service.deleteSv(req.body.id)
    if (result.errCode == 0) {
        await Service.deleteAccount(req.body.masv)
    }
    res.json(result)

}

let login = async (req, res) => {
    let result = await Service.login(req.body)
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
    res.json(result)
}

let addClass = async (req, res) => {
    let result = await Service.addClass(req.body)
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

let getFullInfoSV = async (req, res) => {
    try {
        let result = await Service.getFullInfoSV(req.body)
        res.json(result)

    } catch (err) {
        console.log("controleer getFullInfoSV", err)
    }
}

let themhp = async (req, res) => {
    try {
        let result = await Service.themhp(req.body)
        if (result.errCode == 0) {
            await Service.updateDiemHP(req.body.masv)
        }
        res.json(result)

    } catch (err) {
        console.log("controleer getFullInfoSV", err)
    }
}

let getDiemHP = async (req, res) => {
    try {
        let result = await Service.getDiemHP(req.body)
        res.json(result.data)
    } catch (err) {
        console.log("controleer getDiemHP", err)
    }
}

let deleteDiemHP = async (req, res) => {
    try {
        let result = await Service.deleteDiemHP(req.body)
        if (result.errCode == 0) {
            await Service.updateDiemHP(req.body.masv)
        }
        res.json(result)
    } catch (err) {
        console.log("controleer deleteDiemHP", err)
    }
}

let getFullHP = async (req, res) => {
    try {
        let result = await Service.getFullHP(req.body)
        res.json(result.data)
    } catch (err) {
        console.log("controleer getFullHP", err)
    }
}

let editLop = async (req, res) => {
    try {
        let result = await Service.editLop(req.body)
        res.json(result)
    } catch (err) {
        console.log("controleer editLop", err)
    }
}

let createAnnounce = async (req, res) => {
    try {
        let result = await Service.createAnnounce(req.body)
        res.json(result)
    } catch (err) {
        console.log("controleer createAnnounce", err)
    }
}
let getAllAnnounce = async (req, res) => {
    try {
        let result = await Service.getAllAnnounce(req.body)
        res.json(result)

    } catch (err) {
        console.log("controleer getAllAnnounce", err)
    }
}
let getInfoCVHTFromMaLop = async (req, res) => {
    try {
        let result = await Service.getInfoCVHTFromMaLop(req.body)
        res.json(result)

    } catch (err) {
        console.log("controleer getInfoCVHTFromMaLop", err)
    }
}

let themDRL = async (req, res) => {
    try {
        let result = await Service.themDRL(req.body)
        res.json(result)

    } catch (err) {
        console.log("controleer themDRL", err)
    }
}
let getDRL = async (req, res) => {
    try {
        let result = await Service.getDRL(req.body)
        res.json(result)

    } catch (err) {
        console.log("controleer getDRL", err)
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
    getAllClass,
    getFullInfoSV,
    themhp,
    getDiemHP,
    deleteDiemHP,
    getFullHP,
    editLop,
    createAnnounce,
    getAllAnnounce,
    getInfoCVHTFromMaLop,
    themDRL,
    getDRL
}