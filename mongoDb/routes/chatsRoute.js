import express from 'express';

import { catchAllError } from '../helpers';
import { ChatsController } from '../controllers';
import {
  validatePostChats,
  checkChatExist,
  checkAllChats,
  checkChatIdExists,
  checkUserInParamExist,
  checkUserHasChats,
  checkUserIsAdmin,
  checkUserInChat
} from '../middlewares';

const Chats = express.Router();
const {
  getOneChat,
  getAllChats,
  updateChat,
  deleteChat,
  postPrivateChat,
  postGroupChat,
  findAllChatsByUser
} = ChatsController;

Chats.get('/', checkAllChats, getAllChats);
Chats.get('/private', checkAllChats, getAllChats);
Chats.get('/group', checkAllChats, getAllChats);
Chats.get('/:id/group', checkChatIdExists, getOneChat);
Chats.get('/:id/private', checkChatIdExists, getOneChat);
Chats.get('/:id/user', checkUserInParamExist, checkUserHasChats, findAllChatsByUser);
Chats.delete('/:id/private', checkChatIdExists, checkUserInChat, deleteChat);
Chats.delete('/:id/group', checkChatIdExists, checkUserIsAdmin, deleteChat);

Chats.post('/private', validatePostChats, checkChatExist, postPrivateChat);
Chats.post('/group', validatePostChats, postGroupChat);
Chats.patch('/:id/group', checkChatIdExists, checkUserIsAdmin, updateChat);

catchAllError(Chats);

export default Chats;
