
const controller = require('../controller/controller.js')

let webInItRouter = (app) => {
    app.get("/home", (req, res) => {
        res.json("from server")
    })
    app.post("/cvht/createOnesv", controller.reateOneSV)
    app.get("/cvht/getallstudent", controller.getAllStudent)
    app.post("/cvht/editsv", controller.editSv)
    app.post("/cvht/deletesv", controller.deleteSv)
    app.post("/login", controller.login)
    app.post("/admin/createaccount", controller.createAccount)
}

module.exports = webInItRouter;