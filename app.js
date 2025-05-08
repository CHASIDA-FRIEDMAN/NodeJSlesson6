import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bookRoutes from './routes/book.route.js';
import userRoutes from './routes/user.route.js';
import addCurrentDate from './middleware/addDate.middleware.js';
import printGetRequests from './middleware/printDate.middleware.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import notFound from './middleware/notFound.middleware.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config(); // טוען את המשתנים מהקובץ .env

connectDB(); // חיבור למסד הנתונים

const app = express();

// אמצעי עזר
app.use(cors());               // מאפשר גישה מכל מקור
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));        // מדפיס נתוני בקשות במצב פיתוח

app.use(express.json());

app.use(addCurrentDate); // הוספת המידלוור של תאריך
app.use(printGetRequests); // הוספת המידלוור של הדפסת תאריך

app.get('/', (req, res) => {
    res.send('Welcome to the Book Store API!');
}
);


// הגדרת מסלולי ה-API
app.use('/books', bookRoutes); // מסלול לספרים
app.use('/users', userRoutes); // מסלול למשתמשים

app.use(notFound);       // אם לא נמצא מסלול
app.use(errorHandler);   // כל שגיאה אחרת

// הפעלת השרת
const PORT = process.env.PORT || 5000; // אם לא הוגדר פורט במשתנים הסביבתיים, השתמש ב-5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
