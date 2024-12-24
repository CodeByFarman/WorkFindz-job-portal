import Admin from '../models/adminModel.js';
import generateToken from '../utils/generateToken.js';

// Admin Login
export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            id: admin._id,
            username: admin.username,
            token: generateToken(admin._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create Admin (Optional, for initial setup)
export const createAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const adminExists = await Admin.findOne({ username });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const admin = await Admin.create({ username, password });
        res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
