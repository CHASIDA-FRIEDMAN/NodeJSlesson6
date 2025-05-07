import express from 'express';
import bookRoutes from './routes/book.route.js';
import userRoutes from './routes/user.route.js'; 

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Book Store API!');
}
);


// הגדרת מסלולי ה-API
app.use('/books', bookRoutes); // מסלול לספרים
app.use('/users', userRoutes); // מסלול למשתמשים

// הפעלת השרת
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
