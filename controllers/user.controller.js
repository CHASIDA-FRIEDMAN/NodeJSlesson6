import User from '../models/user.model.js';

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
        const userObj = savedUser.toObject(); // המרת המשתמש לאובייקט רגיל
        delete userObj.password; // הסרת סיסמה מהאובייקט
        res.status(201).json(userObj); // החזרת המשתמש שנשמר
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
        res.json({ message: 'User authenticated successfully' });
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