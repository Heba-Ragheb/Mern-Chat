const Users = require('../Scemas/user'); // Ensure the correct path to your schema
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const jwtSecret = process.env.JWT_PASSWORD;

exports.register = async function (req, res) {
    const { name, password } = req.body;

    // Input validation
    if (!name || !password) {
        return res.status(400).json({ message: 'Name and password are required' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create the user in the database
        const user = await Users.create({ name, password: hashedPassword });

        // Sign a JWT token
        jwt.sign(
            { id: user._id, name: user.name },
            jwtSecret,
            { expiresIn: '1h' }, // Set token expiration
            (error, token) => {
                if (error) {
                    console.error('Error signing token:', error);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                // Set the token in a cookie and respond
                res.cookie('token', token, { httpOnly: true }) // Set httpOnly for security
                    .status(201)
                    .json({
                        _id: user._id,
                        name: user.name, // Optionally return the user's name
                    });
            }
        );
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000) {
            // Handle duplicate key error (e.g., username already exists)
            return res.status(400).json({ message: 'User  already exists' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};