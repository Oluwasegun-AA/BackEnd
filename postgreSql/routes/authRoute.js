import express from 'express';

import { catchAllError } from '../helpers';

const auth = express.Router();

auth.post('/login', (req, res) => res.status(200).json({ message: 'login' }));

auth.post('/signup', (req, res) => res.status(200).json({ message: 'signup' }));

catchAllError(auth);

export default auth;
