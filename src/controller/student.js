
const studentService = require('../service/student')
const accountService = require('../service/account')
class studentControl {
    async createOneSV(req, res) {
        try {
            let infosv = {
                ...req.body
            }
            let response = await studentService.createOneSvService(infosv)
            res.json(response)
        } catch (err) {
            console.log("Error, controller", err)
        }
    }

    async deleteSv(req, res) {
        let result = await studentService.deleteSv(req.body.id)
        if (result.errCode == 0) {
            await accountService.deleteAccount(req.body.masv)
        }
        res.json(result)
    }

    async editSv(req, res) {
        let result = await studentService.editSv(req.body)
        res.json(result)
    }

    async getFullInfoSV(req, res) {
        try {
            let result = await studentService.getFullInfoSV(req.params.studentID)
            res.json(result)
        } catch (err) {
            console.log("controleer getFullInfoSV", err)
        }
    }
    async getAllStudentLop(req, res) {
        try {
            let malop = req.params.classid
            let data = await studentService.getAllStudentLop(malop)
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

    async themDRL(req, res) {
        try {
            let result = await studentService.themDRL(req.body)
            res.json(result)
        } catch (err) {
            console.log("controleer themDRL", err)
        }
    }
    async getDRL(req, res) {
        try {
            let result = await studentService.getDRL(req.body)
            res.json(result)
        } catch (err) {
            console.log("controleer getDRL", err)
        }
    }
}

module.exports = new studentControl()