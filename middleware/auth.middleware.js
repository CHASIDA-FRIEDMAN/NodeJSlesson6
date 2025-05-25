import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const checkAuth = async (req, res, next) => {
    console.log('>> checkAuth ran'); // בדיקה

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'no token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Fetch user without password
        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export const checkAdmin = (req, res, next) => {
    console.log('>> checkAdmin ran');

    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied - admin only' });
    }
    next();
};
