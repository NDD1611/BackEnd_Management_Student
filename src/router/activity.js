

const controller = require('../controller/controller.js')

let activityRoutes = (app) => {
    app.post("/activity", controller.addActivity)
    app.get("/activity/:masv", controller.getActivity)
    app.put("/activity", controller.editActivity)
    app.delete("/activity", controller.delActivity)
}

module.exports = activityRoutes