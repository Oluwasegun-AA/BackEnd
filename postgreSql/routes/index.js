import express from 'express';
import dotenv from 'dotenv';

import auth from './authRoute';
import articles from './articlesRoute';
import feed from './feedRoute';

import { statusCodes, statusMessages, ResponseHandler } from '../helpers';

dotenv.config();
const router = express.Router();
const { success, badRequest } = statusCodes;
const { BASE_URL } = process.env;

router.use('/auth', auth);
router.use('/articles', articles);
router.use('/feeds', feed);

router.use('/', (req, res) =>
  (BASE_URL.includes(req.originalUrl)
    ? ResponseHandler.success(res, success, statusMessages.home)
    : ResponseHandler.error(res, badRequest, statusMessages.badRequest('Invalid route'))));

export default router;
