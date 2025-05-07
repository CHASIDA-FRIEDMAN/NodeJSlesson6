import books  from '../books.js';

// Get all books
export const getAllBooks = (req, res) => {
    res.json(books);
}

// Get a book by ID
export const getBookById = (req, res,next) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        res.status(404);
        return next(new Error('Book not found')) // העברת השגיאה למידלוור
    }
    res.json(book);
}

// Add a new book
export const addBook = (req, res,next) => {
    const { name, price } = req.body;
    if (!name || !price) {
        res.status(400)
        return next(new Error('Name and price are required')) // העברת השגיאה למידלוור
    }
    const newBook = {
        id: books.length + 1,
        name,
        price
    };
    books.push(newBook);
    res.status(201).json(newBook);
}


// Update an existing book
export const updateBook = (req, res,next) => {
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
export const deleteBook = (req, res,next) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
        res.status(404)
        return next(new Error('Book not found')) // העברת השגיאה למידלוור
    }
    books.splice(bookIndex, 1);
    res.status(204).send();
}
