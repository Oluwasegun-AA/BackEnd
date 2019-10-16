import express from 'express';

import { catchAllError } from '../helpers';
import Auth from '../controllers/authController';

const auth = express.Router();
const { login, signup } = Auth;

auth.get('/login', login);

auth.post('/signup', signup);

catchAllError(auth);

export default auth;
