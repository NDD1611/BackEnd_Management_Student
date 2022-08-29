

const Service = require("../service/service.js")

let reateOneSV = async (req, res) => {
    try {
        let infosv = {
            ...req.body,
            password: '123456'
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


module.exports = {
    reateOneSV,
    getAllStudent
}