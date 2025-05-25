import express from 'express';
import { signIn,signUp,getAllUsers ,updateUser} from '../controllers/user.controller.js';
import { checkAuth,checkAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// sign up
// רישום
router.post('/signup',signUp);

//sign in
// התחברות
router.post('/signin', signIn);

// Get all users
router.get('/',checkAuth, checkAdmin,getAllUsers);  // הוספת נתיב לקבלת כל המשתמשים

router.put('/:id', checkAuth, updateUser); // רק משתמש מחובר יכול לעדכן


export default router;