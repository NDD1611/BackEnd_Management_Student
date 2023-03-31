
const controller = require('../controller/controller.js')

let subjectRoutes = (app) => {
    app.post("/subject", controller.themhp)
    app.get("/subject/:studentID", controller.getFullHP)
    app.delete("/subject", controller.deleteDiemHP)
    app.post("/score-semester", controller.getDiemHP)
}
module.exports = subjectRoutes