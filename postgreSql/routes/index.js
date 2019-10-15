import express from 'express';

import auth from './authRoute';
import { statusCodes, statusMessages } from '../helpers';

const router = express.Router();
const { success } = statusCodes;

router.use('/all', (req, res) =>
  res.status(200).json({ message: 'inside router' }));

router.use('/auth', auth);

router.use('/', (req, res) =>
  res.status(success).send({
    status: success,
    message: statusMessages.home,
  }));

export default router;
