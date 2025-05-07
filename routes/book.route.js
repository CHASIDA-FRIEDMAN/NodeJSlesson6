import express from 'express';
import { getAllBooks,getBookById,addBook,updateBook,deleteBook } from '../controllers/book.controller.js';

const router = express.Router();

// Get all books
router.get('/',getAllBooks);

// Get a book by ID
router.get('/:id',getBookById);

// Add a new book
router.post('/',addBook);

// Update an existing book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id',deleteBook);

export default router;