import Book from '../models/book.model.js'; // Import the Book model

// Get all books
export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.json(books);
    }
    catch (err) {
        next(err); // Pass the error to the error handling middleware

    }
}

// Get a book by ID
export const getBookById = async (req, res, next) => {

    try {
        const book = await Book.findById(req.params.id); // שימי לב - לא parseInt
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        next(err);
    }
}

// Add a new book
export const addBook = async (req, res, next) => {
    try {
        const { name, price, categories, author } = req.body; // Extracting data from the request body
        // בדיקת שדות חובה
        if (!name || !price || !author || !author.name || !author.phone || !author.email) {
            res.status(400);
            return next(new Error('Missing required book or author fields'));
        }
        // יצירת ספר חדש
        const newBook = new Book({
            name,
            price,
            categories: categories || [], // אם לא נשלחו קטגוריות, יש להן ערך ברירת מחדל ריק
            author
        });
        // שמירת הספר במסד הנתונים
        const savedBook = await newBook.save();
        res.status(201).json(savedBook); // החזרת הספר שנשמר
    }
    catch (err) {
        next(err); // העברת השגיאה למידלוור
    }
}


// Update an existing book

export const updateBook = async (req, res, next) => {
    try {
        const { name, price } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: { name, price } },
            { new: true, runValidators: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (err) {
        next(err);
    }
};

// Delete a book
export const deleteBook = async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(204).send(); // אין תוכן
    } catch (err) {
        next(err);
    }
};
