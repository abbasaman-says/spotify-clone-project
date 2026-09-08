const userModel = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {

    const { username, email, password, role = "user" } = req.body;

    // Check if user already exists
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        role
    });

    // Create JWT token
    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET);

    // Set token in cookie
    res.cookie("token", token);

    // Send response
    res.status(201).json({
        message: "User registered successfully",

        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}
// Login user and generate JWT token
async function LoginUser(req, res) {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (!user) {
        return res.status(401).json(
            { message: "Invalid credentials" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, return error
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // Create JWT token
    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    // Set token in cookie
    
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });

   
    res.status(200).json({
        message: "User logged in successfully",
        token: token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });

    
}
//logout k lie
async function logoutUser(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "User Logged Out Seccessfully" })
}


module.exports = { registerUser, LoginUser , logoutUser};  