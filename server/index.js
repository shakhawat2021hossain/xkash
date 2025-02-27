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
        'https://xkash-by-shakhawat.web.app'
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

        const user = await Account.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.activeSessionToken !== token) {
            return res.status(401).json({ msg: 'Session expired. Please log in again.' });
        }

        req.userId = decoded.id;
        next();
    });
};

const verifyAdmin = async (req, res, next) => {
    const id = req.userId;
    const admin = await Account.findById(id)
    if (!admin || admin.role !== 'admin') return res.status(404).json({ msg: "unauthorized access" })
    next()
}


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
    income: { type: Number, default: 0 },
    activeSessionToken: { type: String, default: null },
});
const Account = mongoose.model("Account", accountSchema)

const transactionSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    amount: Number,
    fee: Number,
    transactionType: { type: String, enum: ["sendMoney", "cashOut", "cashIn"], required: true },
    timestamp: { type: Date, default: Date.now }
});

const Transaction = mongoose.model("Transaction", transactionSchema);



app.get('/', (req, res) => {
    res.send("Hello there")

})

app.post('/register', async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    const { name, email, pin, mobile, nid, accountType } = newUser;
    try {
        const isExist = await Account.findOne({ $or: [{ mobile }, { email }, { nid }] })
        if (isExist) return res.json({ msg: 'Mobile number, email, or NID already exists' });

        const salt = await bcrypt.genSalt(10)
        const hashedPin = await bcrypt.hash(pin, salt)

        const user = new Account({ name, email, pin: hashedPin, mobile, nid, role: accountType })
        if (accountType === 'user') user.balance = 40;
        if (accountType === 'agent') {
            user.balance = 0;
            user.isApproved = false;
        }

        await user.save()

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
        user.activeSessionToken = token;
        await user.save();

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).json({ success: true, user });
    }
    catch (error) {
        console.error('Registration Error:', error);
        return res.status(500).json({ msg: 'Internal Server Error' });

    }


})

app.post('/login', async (req, res) => {
    const { loginId, pin } = req.body;
    // console.log(loginId);
    try {
        const user = await Account.findOne({ $or: [{ mobile: loginId }, { email: loginId }] })
        if (!user) return res.json({ msg: "No user Found" })

        const match = await bcrypt.compare(pin, user.pin)
        if (!match) return res.json({ msg: "invalid credentials" })

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })
        user.activeSessionToken = token;

        await user.save()

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).send({ success: true, user })
    }
    catch (error) {
        console.log(error);
    }

})

// get user info
app.get('/protected', verifyToken, async (req, res) => {
    try {
        const user = await Account.findById(req.userId).select("-pin");
        // console.log(user);
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
        const token = req.cookies?.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await Account.findById(decoded.id);
            if (user) {
                user.activeSessionToken = null;
                await user.save();
            }
        }
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



const seedAdmin = async () => {
    try {

        const existingAdmin = await Account.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const hashedPin = await bcrypt.hash('12345', 8);
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


// balance
app.get('/balance', verifyToken, async (req, res) => {
    const id = req.userId;
    try {
        const user = await Account.findById(id)
        if (!user) return res.status(404).json({ msg: "User not found" })

        res.status(200).json({ balance: user.balance })
    }
    catch (error) {
        console.error(error)
    }
})

// send money
app.post('/send-money', verifyToken, async (req, res) => {
    const { recipientMobile, amount } = req.body;
    const parsedAmount = parseFloat(amount);

    const senderId = req.userId;
    const sender = await Account.findById(senderId)
    if (!sender) return res.json({ msg: "No account found for the number" })


    const receiver = await Account.findOne({ mobile: recipientMobile })
    if (!receiver) return res.status(404).json({ msg: "Receiver not found" })

    // console.log(`Reciever:${receiver}, Sender: ${sender}`);

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

// Cash-Out Route
app.post('/cash-out', verifyToken, async (req, res) => {
    const { agentMobile, amount, pin } = req.body;
    const parsedAmount = parseFloat(amount);
    // console.log(req.body);
    try {
        const sender = await Account.findById(req.userId);
        if (!sender || sender.role !== 'user' || sender.isBlocked) {
            return res.status(403).json({ msg: "Unauthorized or blocked user" });
        }

        // Verify PIN
        const isPinValid = await bcrypt.compare(pin, sender.pin);
        if (!isPinValid) {
            return res.status(400).json({ msg: "Invalid PIN" });
        }

        // minimum amount
        if (parsedAmount < 50) {
            return res.status(400).json({ msg: "Minimum cash-out amount is 50 Taka" });
        }

        // calculate fee (1.5%)
        const fee = parsedAmount * 0.015;
        const totalDeduction = parsedAmount + fee;

        // sender balance
        if (sender.balance < totalDeduction) {
            return res.status(400).json({ msg: "Insufficient balance" });
        }

        // ADD: isApproved: true
        const agent = await Account.findOne({ mobile: agentMobile, role: 'agent' });
        if (!agent) {
            return res.status(404).json({ msg: "Agent not found or not approved" });
        }

        // Find admin
        const admin = await Account.findOne({ role: 'admin' });
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        // update balances and incomes
        sender.balance -= totalDeduction;
        agent.balance += parsedAmount;
        agent.income += parsedAmount * 0.01;
        admin.income += parsedAmount * 0.005;

        // create transaction
        const transaction = new Transaction({
            sender: sender._id,
            receiver: agent._id,
            amount: parsedAmount,
            fee,
            transactionType: "cashOut"
        });

        // Save all updates
        await Promise.all([sender.save(), agent.save(), admin.save(), transaction.save()]);

        res.status(200).json({
            msg: "Cash-out successful!",
            transactionId: transaction._id,
            senderBalance: sender.balance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});


// cash in
app.post('/cash-in', verifyToken, async (req, res) => {
    const { userMobile, amount, pin } = req.body;
    const parsedAmount = parseFloat(amount);

    try {
        const agent = await Account.findById(req.userId);
        if (!agent || agent.role !== 'agent' || !agent.isApproved || agent.isBlocked) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        // verify PIN
        const isPinValid = await bcrypt.compare(pin, agent.pin);
        if (!isPinValid) {
            return res.status(400).json({ msg: 'Invalid PIN' });
        }

        if (!parsedAmount || parsedAmount <= 0) {
            return res.status(400).json({ msg: 'Amount must be greater than 0' });
        }

        // agents balance
        if (agent.balance < parsedAmount) {
            return res.status(400).json({ msg: 'Insufficient balance' });
        }

        // Find the receiver
        const user = await Account.findOne({ mobile: userMobile, role: 'user' });
        if (!user || user.isBlocked) {
            return res.status(404).json({ msg: 'User not found or blocked' });
        }

        // update balances
        agent.balance -= parsedAmount;
        user.balance += parsedAmount;

        // create transaction
        const transaction = new Transaction({
            sender: agent._id,
            receiver: user._id,
            amount: parsedAmount,
            fee: 0,
            transactionType: 'cashIn',
        });

        // Save all updates
        await Promise.all([agent.save(), user.save(), transaction.save()]);

        res.status(200).json({
            msg: 'Cash-in successful!',
            transactionId: transaction._id,
            agentBalance: agent.balance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});


app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await Account.find({}, '-pin')
        res.json(users)

    }
    catch (error) {
        console.log(error);
    }
})

app.patch('/user/:id', verifyToken, verifyAdmin, async (req, res) => {
    const id = req.params.id;
    const { isBlocked } = req.body;
    console.log(isBlocked);

    const user = await Account.findById(id)
    if (!user) return res.status(404).json({ msg: "user not found" })
    if (user.role === 'admin') return res.status(403).json({ msg: 'Cannot block/unblock an admin' });

    user.isBlocked = isBlocked;
    user.save()
    res.status(200).json({ msg: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully` })

})

// pending agents
app.get('/pending-agents', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const pendingAgents = await Account.find({
            role: 'agent',
            isApproved: false
        }).select('name mobile email nid balance income isApproved');
        res.status(200).json(pendingAgents);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// agent approval
app.patch('/agents/:id', verifyToken, verifyAdmin, async (req, res) => {
    const { isApproved } = req.body;
    console.log(isApproved);

    try {
        const agent = await Account.findById(req.params.id);
        if (!agent || agent.role !== 'agent') {
            return res.status(404).json({ msg: 'Agent not found' });
        }

        if (agent.isApproved === isApproved) {
            return res.status(400).json({ msg: `Agent is already ${isApproved ? 'approved' : 'pending/rejected'}` });
        }

        agent.isApproved = isApproved;
        if (isApproved) {
            agent.balance = 100000;
        }
        await agent.save();

        res.status(200).json({
            msg: `Agent ${isApproved ? 'approved' : 'rejected'} successfully`,
            agent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Add this route in your existing server file
app.get('/system-stats', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await Account.find({ role: { $in: ['user', 'agent'] } });
        const totalMoney = users.reduce((sum, user) => sum + user.balance, 0);
        const admin = await Account.findById(req.userId);
        if (!admin) return res.status(404).json({ msg: 'Admin not found' });

        res.status(200).json({
            adminIncome: admin.income,
            totalMoneyInSystem: totalMoney,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.get('/transactions', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const transactions = await Transaction.find({
            $or: [{ sender: userId }, { receiver: userId }],
        })
            .sort({ timestamp: -1 }) // Sort by most recent first
            .limit(100) // Limit to 100 transactions
            .populate('sender', 'name mobile role')
            .populate('receiver', 'name mobile role');

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running from ${port}`);
})


