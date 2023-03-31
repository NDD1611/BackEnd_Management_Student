
const controller = require('../controller/controller.js')

let consultantRoutes = (app) => {
    app.put("/consultant", controller.editCVHT)
    app.get("/consultant-from-class/:classID", controller.getInfoCVHTFromMaLop)
}
module.exports = consultantRoutes