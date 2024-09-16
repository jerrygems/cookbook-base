var express = require("express")
var cors = require("cors")
var mongoose = require("mongoose")
var app = express()


mongoose.connect("mongodb://[::1]:27017/cookbook", {
    autoCreate: true,
}).then(() => {console.log("connected")}).catch((err) => console.log(err))

app.use(cors());
// app.use(cookieParser())

// app.get("/api/getrecipes",getRecipes)
// app.get("/api/createrecipe",createRecipes)
// app.get("/api/deleterecipe",deleteRecipe)
// app.get("/api/editrecipe",editRecipes)
// app.get("/api/searchrecipe",searchRecipe)
// app.get("/api/login",login)
// app.get("/api/register",register)



app.listen(process.env.PORT || 3000, () => console.log("started"))