import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        let { fullname, email, phoneNumber, password } = req.body;

        // Ensure phoneNumber is a valid number
        phoneNumber = Number(phoneNumber);
        if (isNaN(phoneNumber)) {
            return res.status(400).json({
                message: "Invalid phone number",
                success: false,
            });
        }

        // Check for missing fields
        if (!fullname || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};





export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({}, 'fullname email phoneNumber'); // Excluding sensitive info like password

        // Check if users exist
        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Users fetched successfully.",
            success: true,
            data: users, // Sending back the user details
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};






// Login a User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Removed role field

        if (!email || !password) { // No role check required
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}



// Logout a User
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// Update a User profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // updating data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
