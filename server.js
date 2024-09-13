var express = require("express")
var cors = require("cors")
var mongoose = require("mongoose")
mongoose.connect()
var app = express()

app.use(cors)

app.get("/apl/getrecipes")
app.get("/apl/createrecipe")
app.get("/apl/deleterecipe")
app.get("/apl/editrecipe")
app.get("/apl/searchrecipe")
app.get("/apl/login")
app.get("/apl/register")



app.listen(process.env.PORT || 3000,()=>console.log("started"))