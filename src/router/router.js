
const controller = require('../controller/controller.js')

let webInItRouter = (app) => {
    app.get("/home", (req, res) => {
        res.json("from server")
    })
    app.post("/cvht/createOnesv", controller.reateOneSV)
    app.get("/cvht/getallstudent", controller.getAllStudent)
}

module.exports = webInItRouter;