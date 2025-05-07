import users from '../users.js'; 

// sign up
export const signUp = (req, res,next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400)
        return next(new Error('Username and password are required')); // העברת השגיאה למידלוור
    }
    const newUser = {
        id: users.length + 1,
        username,
        password
    };
    users.push(newUser);
    res.status(201).json(newUser);
}

//sign in
export const signIn = (req, res,next) => {
    console.log('Users:', users);
    console.log('Trying to find:', username, password);
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        res.status(401);
        return next(new Error('Invalid credentials')); // העברת השגיאה למידלוור
    }
    res.json({ message: 'User authenticated successfully' });
}