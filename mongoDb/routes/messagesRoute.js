import express from 'express';
import { catchAllError } from '../helpers';
import { MessagesController } from '../controllers';
import {
  validatePostMessages,
  checkAllMessages,
  checkMessageIdExists,
  checkUserInParamExist,
  checkUserHasMessages,
  checkUserOwnsMessage,
  checkUserInChat,

  checkAdminInToken,
  checkUserInToken
} from '../middlewares';

const Messages = express.Router();
const {
  getOneMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
  postPrivateMessage,
  postGroupMessage,
  findAllMessagesByUser
} = MessagesController;

Messages.get('/', checkAdminInToken, checkAllMessages, getAllMessages);
Messages.get('/private', checkAdminInToken, checkAllMessages, getAllMessages);
Messages.get('/group', checkAdminInToken, checkAllMessages, getAllMessages);
Messages.get('/:id/group', checkUserInToken, checkMessageIdExists, getOneMessage);
Messages.get('/:id/private', checkUserInToken, checkMessageIdExists, getOneMessage);
Messages.get('/:id/user', checkUserInToken, checkUserInParamExist, checkUserHasMessages, findAllMessagesByUser);
Messages.delete('/:id/private', checkUserInToken, checkMessageIdExists, checkUserOwnsMessage, deleteMessage);
Messages.delete('/:id/group', checkUserInToken, checkMessageIdExists, checkUserOwnsMessage, deleteMessage);
Messages.post('/private', checkUserInToken, validatePostMessages, checkUserInChat, postPrivateMessage);
Messages.post('/group', checkUserInToken, validatePostMessages, checkUserInChat, postGroupMessage);
Messages.patch('/:id/group', checkUserInToken, checkMessageIdExists, checkUserOwnsMessage, checkUserInChat, updateMessage);
Messages.patch('/:id/private', checkUserInToken, checkMessageIdExists, checkUserOwnsMessage, checkUserInChat, updateMessage);

catchAllError(Messages);

export default Messages;
