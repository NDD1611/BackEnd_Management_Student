
const controller = require('../controller/controller.js')
const studentControl = require('../controller/student.js')
let studentRoutes = (app) => {
    app.post("/student", studentControl.createOneSV)
    app.delete("/student", studentControl.deleteSv)
    app.put("/student", studentControl.editSv)
    app.get("/student/:studentID", studentControl.getFullInfoSV)
    app.get("/student-all-class/:classid", studentControl.getAllStudentLop)
    app.post("/diem-ren-luyen", studentControl.themDRL)
    app.post("/getdiemrenluyen", studentControl.getDRL)
}

module.exports = studentRoutes