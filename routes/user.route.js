import express from 'express';
import { signIn,signUp,getAllUsers } from '../controllers/user.controller.js';

const router = express.Router();

// sign up
// רישום
router.post('/signup',signUp);

//sign in
// התחברות
router.post('/signin', signIn);

// Get all users
router.get('/', getAllUsers);  // הוספת נתיב לקבלת כל המשתמשים

export default router;