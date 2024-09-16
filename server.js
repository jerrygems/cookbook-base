var express = require("express")
var cors = require("cors")
var cookieParser = require('cookie-parser')
var mongoose = require("mongoose")
var recipe = require("./routes/recipe")

var app = express()


mongoose.connect("mongodb://0.tcp.in.ngrok.io:11225/cookbook", {
    autoCreate: true,
    family:4
}).then(() => {console.log("connected")}).catch((err) => console.log(err))

app.use(cors());
app.use(cookieParser())

app.use("/api",recipe)


app.listen(process.env.PORT || 3000, () => console.log("started"))