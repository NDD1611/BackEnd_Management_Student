
const Service = require("../service/service.js")

let editCVHT = async (req, res) => {
    try {
        let result = await Service.editCVHT(req.body)
        res.json(result)
    } catch (err) {
        console.log('editCVHT', err)
    }
}

let login = async (req, res) => {
    try {
        let result = await Service.login(req.body)
        res.json(result)
    } catch (err) {
        console.log(err)
        res.json({
            errCode: 1,
            mes: "tài khoản không tồn tại"
        })
    }
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
        let result = await Service.getAllClass(req.params.consultantID)
        res.json(result)
    } catch (err) {
        console.log("controleer getAllClass", err)
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
        console.log("controleer theHp", err)
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
        let result = await Service.getFullHP(req.params.studentID)
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
let delLop = async (req, res) => {
    try {
        let result = await Service.delLop(req.body)
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
        let result = await Service.getAllAnnounce(req.params.classID)
        res.json(result)

    } catch (err) {
        console.log("controleer getAllAnnounce", err)
    }
}
let getInfoCVHTFromMaLop = async (req, res) => {
    try {
        let result = await Service.getInfoCVHTFromMaLop(req.params.classID)
        res.json(result)

    } catch (err) {
        console.log("controleer getInfoCVHTFromMaLop", err)
    }
}

let addActivity = async (req, res) => {
    try {
        let data = req.body
        let result = await Service.addHD(data)
        res.json(result)
    } catch (err) {
        console.log("controleer addHD", err)
    }
}
let getActivity = async (req, res) => {
    try {
        let masv = req.params.masv
        let result = await Service.getHD(masv)
        res.json(result)
    } catch (err) {
        console.log("controleer getHD", err)
    }
}
let editActivity = async (req, res) => {
    try {
        let data = req.body
        let result = await Service.editHD(data)
        res.json(result)
    } catch (err) {
        console.log("controleer editHD", err)
    }
}
let delActivity = async (req, res) => {
    try {
        let data = req.body
        let result = await Service.delHD(data)
        res.json(result)
    } catch (err) {
        console.log("controleer delHD", err)
    }
}
module.exports = {

    login,
    createAccount,
    changePass,
    editCVHT,
    addClass,
    getAllClass,
    themhp,
    getDiemHP,
    deleteDiemHP,
    getFullHP,
    editLop,
    delLop,
    createAnnounce,
    getAllAnnounce,
    getInfoCVHTFromMaLop,
    addActivity,
    getActivity,
    editActivity,
    delActivity
}