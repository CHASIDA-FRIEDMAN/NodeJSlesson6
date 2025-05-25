import User from '../models/user.model.js';
import { generateToken } from '../utils/generateToken.js';
// sign up
//רישום 
export const signUp = async (req, res, next) => {
    const { name, email, phone, password } = req.body;

    if (!name || !password || !email || !phone) {
        res.status(400);
        return next(new Error('All fields are required')); // העברת השגיאה למידלוור
    }

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            res.status(409); // 409 Conflict
            return next(new Error('User with this email or phone already exists')); // העברת השגיאה למידלוור
        }
        const newUser = new User({
            name,
            email,
            phone,
            password
        });
        const savedUser = await newUser.save();
        const token = generateToken(savedUser); // יצירת טוקן JWT למשתמש שנשמר
        const userObj = savedUser.toObject(); // המרת המשתמש לאובייקט רגיל
        delete userObj.password; // הסרת סיסמה מהאובייקט
        res.status(201).json({ user: userObj, token }); // החזרת המשתמש שנשמר
    } catch (error) {
        next(error); // העברת השגיאה למידלוור
    }
}

//sign in
// התחברות
export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            res.status(401); // 401 Unauthorized
            return next(new Error('Invalid credentials')); // העברת השגיאה למידלוור
        }
        const token = generateToken(user); // יצירת טוקן JWT למשתמש
        const userObj = user.toObject(); // המרת המשתמש לאובייקט רגיל
        delete userObj.password; // הסרת סיסמה מהאובייקט
        res.json({ user: userObj, token, message: 'User authenticated successfully' });
    } catch (error) {
        next(error); // העברת השגיאה למידלוור
    }
}

// Get all users without password
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password'); // Fetch all users excluding the password field
        res.json(users);
    } catch (error) {
        next(error); // העברת השגיאה למידלוור
    }
}

// Update user by ID
export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, phone, password },
            { new: true, runValidators: true } // Return the updated document and validate
        ).select('-password'); // Exclude password from the response

        if (!updatedUser) {
            res.status(404); // 404 Not Found
            return next(new Error('User not found')); // העברת השגיאה למידלוור
        }

        res.json(updatedUser);
    } catch (error) {
        next(error); // העברת השגיאה למידלוור
    }
}