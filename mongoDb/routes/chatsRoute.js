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
  checkUserInChat,
  checkUserInToken,
  checkAdminInToken
} from '../middlewares';

const Chats = express.Router();
const {
  getOneChat,
  getAllChats,
  updateChat,
  deleteChat,
  postPrivateChat,
  postGroupChat,
  findAllChatsByUser,
  getAllMessagesInChat
} = ChatsController;

Chats.get('/', checkAdminInToken, checkAllChats, getAllChats);
Chats.get('/private', checkAdminInToken, checkAllChats, getAllChats);
Chats.get('/group', checkAdminInToken, checkAllChats, getAllChats);
Chats.get('/:id/group', checkUserInToken, checkChatIdExists, getOneChat);
Chats.get('/:id/private', checkUserInToken, checkChatIdExists, getOneChat);
Chats.get('/:id/user', checkUserInToken, checkUserInParamExist, checkUserHasChats, findAllChatsByUser);
Chats.get('/:id/messages', checkUserInToken, checkChatIdExists, getAllMessagesInChat);
Chats.delete('/:id/private', checkUserInToken, checkChatIdExists, checkUserInChat, deleteChat);
Chats.delete('/:id/group', checkUserInToken, checkChatIdExists, checkUserIsAdmin, deleteChat);

Chats.post('/private', validatePostChats, checkChatExist, postPrivateChat);
Chats.post('/group', validatePostChats, postGroupChat);
Chats.patch('/:id/group', checkChatIdExists, checkUserIsAdmin, updateChat);

catchAllError(Chats);

export default Chats;
