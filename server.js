require('dotenv').config();
var express = require("express")
var cors = require("cors")
var cookieParser = require('cookie-parser')
var mongoose = require("mongoose")
var recipe = require("./routes/recipe")

var app = express()


mongoose.connect(`${process.env.MONGO_URL}`, {
    autoCreate: true,
    family:4
}).then(() => {console.log("connected")}).catch((err) => console.log(err))

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use("/api",recipe)


app.listen(4000, () => console.log("started"))