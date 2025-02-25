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
        // console.log("verifytoken", decoded);

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

const transactionSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    fee: Number,
    transactionType: { type: String, enum: ["sendMoney"], default: "sendMoney" },
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", transactionSchema);



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



async function seedAdmin() {
    try {

        const existingAdmin = await Account.findOne({ accountType: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const hashedPin = await bcrypt.hash('12345', 8); // Default PIN
        const admin = new Account({
            name: 'Admin',
            pin: hashedPin,
            mobile: '01700000000',
            email: 'admin@mfs.com',
            nid: '1234567890',
            accountType: 'admin',
            balance: 0,
            income: 0,
            isApproved: true,
            isBlocked: false
        });

        await admin.save();


    } catch (error) {
        console.error('Error creating admin:', error);
    }
}

// seedAdmin();

// send money
app.post('/send-money', verifyToken, async (req, res) => {
    const { recipientMobile, amount } = req.body;
    const parsedAmount = parseFloat(amount);

    const senderId = req.userId;
    const sender = await Account.findById(senderId)
    if (!sender) return res.json({ msg: "No account found for the number" })


    const receiver = await Account.findOne({ mobile: recipientMobile })
    if (!receiver) return res.status(404).json({ msg: "Receiver not found" })

    console.log(`Reciever:${receiver}, Sender: ${sender}`);

    if (receiver._id.toString() === sender._id.toString()) return res.json({ msg: "you cant send money yourself" })

    const fee = parsedAmount > 100 ? 5 : 0;
    const totalDeduction = parsedAmount + fee;

    if (sender.balance < totalDeduction) {
        return res.status(400).send({ error: 'Insufficient balance' });
    }

    const admin = await Account.findOne({ role: 'admin' })
    if (!admin) return res.status(404).json({ msg: "Admin not found" })

    // Update balances
    sender.balance -= totalDeduction;
    receiver.balance += parsedAmount;
    admin.balance += fee;
    admin.income += fee;

    const transaction = new Transaction({
        sender: sender._id,
        receiver: receiver._id,
        amount: parsedAmount,
        fee,
        transactionType: "sendMoney"
    });

    await Promise.all([sender.save(), receiver.save(), admin.save(), transaction.save()]);

    res.status(200).json({
        msg: "Transaction successful!",
        transactionId: transaction._id,
        senderBalance: sender.balance,
    });



})

app.listen(port, () => {
    console.log(`Server running from ${port}`);
})


