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

users.get('/', checkAdminInToken, getAllUsers);
users.get('/:id', checkUserInToken, checkUserInParamExist, getUser);
users.post('/', checkAdminInToken, validateSignupData, checkUserExist, postUser);
users.patch('/:id', checkUserInToken, checkUserInParamExist, updateUser);
users.delete('/:id', checkAdminInToken, checkUserInParamExist, deleteUser);


catchAllError(users);

export default users;
