
const controller = require('../controller/controller.js')

let classRoutes = (app) => {
    app.post("/class", controller.addClass)
    app.get("/class/:consultantID", controller.getAllClass)
    app.put("/class", controller.editLop)
    app.delete("/class", controller.delLop)
}

module.exports = classRoutes
