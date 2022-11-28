
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
    app.post("/getfullinfosv", controller.getFullInfoSV)
    app.post("/sv/themhp", controller.themhp)
    app.post("/getdiemhpt", controller.getDiemHP)
    app.post("/deletediemhpt", controller.deleteDiemHP)
    app.post("/getfullhp", controller.getFullHP)
    app.post("/cvht/editlop", controller.editLop)
    app.post("/createannouce", controller.createAnnounce)
    app.post("/getallannounce", controller.getAllAnnounce)
    app.post("/getinfocvhtfrommalop", controller.getInfoCVHTFromMaLop)
    app.post("/adddiemrenluyen", controller.themDRL)
    app.post("/getdiemrenluyen", controller.getDRL)
    app.post("/addHD", controller.addHD)
    app.post("/getHD", controller.getHD)
    app.post("/editHD", controller.editHD)
    app.post("/delHD", controller.delHD)
}

module.exports = webInItRouter;