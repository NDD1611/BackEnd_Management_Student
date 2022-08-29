const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const webInItRouter = require("./src/router/router.js")
const connectDB = require("./src/config/connectDB.js")


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

webInItRouter(app);
connectDB();

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})