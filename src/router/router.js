
const controller = require('../controller/controller.js')
const studentRoutes = require('./student.js')
const classRoutes = require('./class.js')
const accountRoutes = require('./account.js')
const subjectRoutes = require('./subject.js')
const activityRoutes = require('./activity.js')
const consultantRoutes = require('./consultant.js')
const announceRoutes = require('./announce.js')

let webInItRouter = (app) => {
    studentRoutes(app)
    classRoutes(app)
    accountRoutes(app)
    subjectRoutes(app)
    activityRoutes(app)
    consultantRoutes(app)
    announceRoutes(app)
}

module.exports = webInItRouter;