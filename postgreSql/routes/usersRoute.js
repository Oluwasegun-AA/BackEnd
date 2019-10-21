import express from 'express';

import { catchAllError } from '../helpers';
import { UsersController } from '../controllers';

const feeds = express.Router();
const {
  getAllUsers,
  postuser,
  updateUser,
  deleteuser
} = UsersController;

feeds.get('/', getAllUsers);

catchAllError(feeds);

export default feeds;
