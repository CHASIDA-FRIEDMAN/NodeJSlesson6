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
export const getBookById = (req, res, next) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        res.status(404);
        return next(new Error('Book not found')) // העברת השגיאה למידלוור
    }
    res.json(book);
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
export const updateBook = (req, res, next) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        res.status(404)
        return next(new Error('Book not found')) // העברת השגיאה למידלוור
    }
    const { name, price } = req.body;
    if (name !== undefined) {
        book.name = name;
    }
    if (price !== undefined) {
        book.price = price;
    }
    res.json(book);
}

// Delete a book
export const deleteBook = (req, res, next) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
        res.status(404)
        return next(new Error('Book not found')) // העברת השגיאה למידלוור
    }
    books.splice(bookIndex, 1);
    res.status(204).send();
}
