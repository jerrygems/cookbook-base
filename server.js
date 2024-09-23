require('dotenv').config();
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const recipe = require("./routes/recipe")
const bodyParser = require('body-parser');


const app = express()


mongoose.connect(`${process.env.MONGO_URL}`, {
    autoCreate: true,
    family: 4
}).then(() => { console.log("connected") }).catch((err) => { console.log(err); process.exit })

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ limit: '10mb' })); 
app.use('/uploads', express.static('uploads'));
app.use("/api", recipe)


app.listen(4000, () => console.log("started"))