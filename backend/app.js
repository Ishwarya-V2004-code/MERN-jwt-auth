const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = require('./middleware/authMiddleware')
const adminMiddleware = require("./middleware/adminMiddleware")
const express = require("express")
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors({
    origin: [
        "mern-jwt-auth-w77l-git-main-ishu-468a.vercel.app",
        "mern-jwt-auth-w77l-2fyfijd7e-ishu-468a.vercel.app",
        "http://localhost:3000"
    ],
    credentials: true
}))

mongoose.connect(process.env.MONGOOSE_URL)
    .then(() => {
        console.log('mongoDB connected')
    }).catch((err) => {
        console.log("mongoDB not connected")
    })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    }

})

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
    const { username, password, role } = req.body;

    const hashedpwd = await bcrypt.hash(password, 10);

    await User.create({
        username: username,
        password: hashedpwd,
        role: role || "user"
    })

    res.send('user created successfully')
})


app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username })

    if (!user) {
        return res.send({
            message: "user not found"
        })
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    )

    if (!isMatch) {
        return res.send({
            message: 'password incorrect'
        });
    }

    const token = jwt.sign(
        {
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET
    )

    res.send({
        message: "Login succesfull",
        token
    })
})

app.get("/profile", authMiddleware, (req, res) => {
    res.send("Profile data fetched")
})

app.get("/dashboard", authMiddleware, (req, res) => {
    res.send("dashborad route")
})

app.get("/admin",
    authMiddleware,
    adminMiddleware
    , async (req, res) => {
        const users = await User.find();

        res.json(users);
    })

app.delete("/admin/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        await User.findByIdAndDelete(req.params.id);

        res.send({
            message: "user deleted"
        });
    })


app.listen(process.env.PORT, () => {
    console.log('server running');
})