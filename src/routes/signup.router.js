import { Router } from 'express';
import { signupcontroller } from '../controllers/signup.controller.js';
import { signupmiddleware } from '../middlewares/signup.middleware.js';

const signuprouter = Router();

signuprouter.post('/signup', signupmiddleware, signupcontroller);

export { signuprouter };