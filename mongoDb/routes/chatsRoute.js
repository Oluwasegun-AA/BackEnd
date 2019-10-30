import express from 'express';

import { catchAllError } from '../helpers';
import { ChatsController } from '../controllers';
import {
  validatePostChats,
  validateEditChats,
  checkChatExist,
  checkAllChats,
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
Chats.get('/:id', checkAllChats, getOneChat);
Chats.get('/:id/user', findAllChatsByUser);
Chats.delete('/:slug', checkChatExist, deleteChat);

Chats.post('/private', validatePostChats, checkChatExist, postPrivateChat);
Chats.post('/group', validatePostChats, checkChatExist, postGroupChat);
Chats.patch(
  '/:slug',
  validateEditChats,
  checkChatExist,
  updateChat
);

catchAllError(Chats);

export default Chats;
