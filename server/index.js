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



//verify JWT
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ msg: "Invalid token" });
        }
        console.log("verifytoken", decoded);
   
        req.userId = decoded.id;
        next();
    });
};


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
    name: String,
    pin: String,
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
    nid: { type: String, unique: true },
    role: String,
    isApproved: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    balance: Number,
    income: Number
});
const Account = mongoose.model("Account", accountSchema)


app.get('/', (req, res) => {
    res.send("Hello there")

})

app.post('/register', async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    const { name, email, pin, mobile, nid, accountType } = newUser

    const isExist = await Account.findOne({ $or: [{ mobile }, { email }, { nid }] })
    if (isExist) return res.json({ msg: 'Mobile number, email, or NID already exists' });

    const salt = await bcrypt.genSalt(10)
    const hashedPin = await bcrypt.hash(pin, salt)

    const user = new Account({ name, email, pin: hashedPin, mobile, nid, role: accountType })
    if (accountType === 'user') user.balance = 40;
    if (accountType === 'agent') {
        user.balance = 100000;
        user.isApproved = false;
    }

    await user.save()

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    }).json({ success: true, user }); 
})

app.post('/login', async (req, res) => {
    const { loginId, pin } = req.body;
    const user = await Account.findOne({ $or: [{ mobile: loginId }, { email: loginId }] })
    if (!user) return res.json({ msg: "No user Found" })

    const match = bcrypt.compare(pin, user.pin)
    if (!match) return res.json({ msg: "invalid credentials" })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    }).send({ success: true, user })
})

// get user info
app.get('/protected', verifyToken, async (req, res) => {
    try {
        const user = await Account.findById(req.userId).select("-pin");
        console.log(user);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

app.post('/logout', async (req, res) => {
    try {
        res
            .clearCookie('token', {
                maxAge: 0,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            })
            .send({ success: true })
        console.log('Logout successful')
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(port, () => {
    console.log(`Server running from ${port}`);
})


