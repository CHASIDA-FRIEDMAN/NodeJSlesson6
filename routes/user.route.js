import express from 'express';
import users from '../users.js'; 

const router = express.Router();

// sign up
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const newUser = {
        id: users.length + 1,
        username,
        password
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

//sign in
router.post('/signin', (req, res) => {
    console.log('Users:', users);
console.log('Trying to find:', username, password);

    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'User authenticated successfully' });
});

export default router;