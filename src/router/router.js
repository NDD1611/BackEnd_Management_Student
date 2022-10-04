
const controller = require('../controller/controller.js')

let webInItRouter = (app) => {
    app.get("/home", (req, res) => {
        res.json("from server")
    })
    app.post("/cvht/createOnesv", controller.reateOneSV)
    app.post("/cvht/getallstudentlop", controller.getAllStudentLop)
    app.post("/cvht/editsv", controller.editSv)
    app.post("/cvht/editcvht", controller.editCVHT)
    app.post("/cvht/deletesv", controller.deleteSv)
    app.post("/login", controller.login)
    app.post("/admin/createaccount", controller.createAccount)
    app.post("/changepass", controller.changePass)
    app.post("/cvht/addclass", controller.addClass)
    app.post("/cvht/getclass", controller.getAllClass)
}

module.exports = webInItRouter;