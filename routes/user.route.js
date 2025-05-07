import express from 'express';
import { signIn,signUp } from '../controllers/user.controller.js';

const router = express.Router();

// sign up
router.post('/signup',signUp);

//sign in
router.post('/signin', signIn);

export default router;