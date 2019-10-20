import express from 'express';

import { catchAllError } from '../helpers';
import Auth from '../controllers/AuthController';
import {
  validateSignupData,
  validateLoginData,
  checkUserExist
} from '../middlewares';

const auth = express.Router();
const { login, signup } = Auth;

auth.post('/login', validateLoginData, checkUserExist, login);
auth.post('/signup', validateSignupData, checkUserExist, signup);

catchAllError(auth);

export default auth;
