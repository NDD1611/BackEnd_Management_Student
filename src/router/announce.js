
const controller = require('../controller/controller.js')
let announceRoutes = (app) => {
    app.post("/announce", controller.createAnnounce)
    app.get("/announce/:classID", controller.getAllAnnounce)
}

module.exports = announceRoutes