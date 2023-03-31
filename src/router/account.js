
const controller = require('../controller/controller.js')

let accountRoutes = (app) => {
    app.post("/login", controller.login)
    app.post("/account", controller.createAccount)
    app.put("/password", controller.changePass)
}

module.exports = accountRoutes