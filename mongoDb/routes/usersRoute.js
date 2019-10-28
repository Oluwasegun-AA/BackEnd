import express from 'express';

import { catchAllError } from '../helpers';
import { UsersController } from '../controllers';
import {
  checkUserInToken,
  validateSignupData,
  checkUserExist,
  checkAdminInToken,
  checkUserInParamExist
} from '../middlewares';

const users = express.Router();
const {
  getUser,
  getAllUsers,
  postUser,
  updateUser,
  deleteUser
} = UsersController;

users.get('/', getAllUsers);
users.get('/:id', checkUserInParamExist, getUser);
users.post('/', validateSignupData, checkUserExist, postUser);
// users.patch('/:id', checkUserInParamExist, updateUser);
// users.delete('/:id', checkUserInParamExist, deleteUser);


catchAllError(users);

export default users;
