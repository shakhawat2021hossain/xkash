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
    name: { type: String, required: true },
    pin: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    nid: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["user", "agent", "admin"] },
    isApproved: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    balance: { type: Number },
    income: { type: Number }
})
const Account = mongoose.model("Account", accountSchema)


app.get('/', (req, res) => {
    res.send("Hello there")

})

app.post('/register', async (req, res) => {
    const { name, email, pin, mobile, nid, accountType } = req.body;

    const isExist = await Account.findOne({ $or: [{ mobile }, { email }, { nid }] })
    if (isExist) return res.json({ msg: 'Mobile number, email, or NID already exists' });

    const salt = await bcrypt.genSalt(10)
    const hashedPin = await bcrypt.hash(pin, salt)

    const user = { name, email, pin: hashedPin, mobile, nid, role: accountType }
    if (user.accountType === 'user') user.balance = 40;
    if (accountType === 'agent') {
        user.balance = 100000;
        user.isApproved = false;
    }

    const newUser = new Account(user)
    await newUser.save()
    res.json({ msg: `${accountType} registered successfully` });
})

app.post('/login', async (req, res) => {
    const { loginId, pin } = req.body;
    const user = await Account.find({ $or: [{ mobile: loginId }, { email: loginId }] })
    if (!user) return res.json({ msg: "No user Found" })

    const match = await bcrypt.compare(pin, user.pin)
    if (!match) return res.json({ msg: "invalid credentials" })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    }).send({ success: true })
})


app.get('/protected', async(req, res) =>{
    
})

app.listen(port, () => {
    console.log(`Server running from ${port}`);
})


