import { Router } from 'express';
import { signincontroller } from '../controllers/signin.controller.js';
import { signinmiddleware } from '../middlewares/signin.middleware.js';

const signinrouter = Router();

signinrouter.post('/signin', signinmiddleware, signincontroller);

export { signinrouter };