import express from 'express';
import books  from '../books.js';

const router = express.Router();

// Get all books
router.get('/', (req, res) => {
    res.json(books);
});

// Get a book by ID
router.get('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

// Add a new book
router.post('/', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }
    const newBook = {
        id: books.length + 1,
        name,
        price
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update an existing book
router.put('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    const { name, price } = req.body;
    if (name !== undefined) {
        book.name = name;
    }
    if (price !== undefined) {
        book.price = price;
    }
    res.json(book);
});

// Delete a book
router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    books.splice(bookIndex, 1);
    res.status(204).send();
});

export default router;