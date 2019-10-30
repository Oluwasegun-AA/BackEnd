import express from 'express';
import dotenv from 'dotenv';

import auth from './authRoute';
import chats from './chatsRoute';
import feeds from './feedsRoute';
import users from './usersRoute';

import { statusCodes, statusMessages, ResponseHandler } from '../helpers';

dotenv.config();
const router = express.Router();
const { success, badRequest } = statusCodes;
const { BASE_URL } = process.env;

router.use('/auth', auth);
router.use('/chats', chats);
// router.use('/feeds', feeds);
router.use('/users', users);

router.use('/', (req, res) =>
  (BASE_URL.includes(req.originalUrl)
    ? ResponseHandler.success(res, success, statusMessages.home)
    : ResponseHandler.error(res, badRequest, statusMessages.badRequest('Invalid route'))));

export default router;
