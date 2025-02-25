const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const mongoose = require('mongoose')
const port = process.env.port || 5000;


const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
    ],
    credentials: true,
    optionSuccessStatus: 200,
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    }
    catch (err) {
        console.log(err);
    }
}
connectDb()


// schemas
const accountSchema = new mongoose.Schema({
    name: {type: String, required: true},
    pin: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobileNumber: {type: String, required: true, unique: true},
    nid: {type: String, required: true, unique: true},
    role: {type: String, required: true, enum: ["user", "agent", "admin"]},
    isApproved: {type: Boolean, required: true},
    isBlocked: {type: Boolean, required: true},
    balance: {type: Number},
    income: {type: Number}
})
const Account = mongoose.model("Account", accountSchema)

app.get('/', (req, res) => {
    res.send("Hello there")

})

app.listen(port, () => {
    console.log(`Server running from ${port}`);
})


