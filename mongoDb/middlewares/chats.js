import { omit, isEmpty } from 'lodash';
import uuid from 'uuid/v4';
import { GroupChatModel, PrivateChatModel } from '../models';

import {
  ResponseHandler,
  statusCodes,
  statusMessages,
  validate,
  GetData,
} from '../helpers';

const validatePostChats = async (req, res, next) => {
  console.log('kkkkk', req.body)
  const data = { ...GetData.chat(req), chatId: uuid(), id: uuid() };
  console.log(data)
  const model = req.url === '/group' ? GroupChatModel : PrivateChatModel;
  const error = validate(model, data);
  console.log(error)
  console.log(!isEmpty(error))
  if (!isEmpty(error)) return ResponseHandler.error(res, statusCodes.badRequest, Object.values(error.errors).flatMap(err => err.message));
  req.data = data;
  next();
};

const validateEditChats = async (req, res, next) => '';
// joiValidateHelper(req, res, next, editArticlesSchema);

const checkChatExist = async (req, res, next) => {
  const { method, url } = req;
  const model = url === '/group' ? GroupChatModel : PrivateChatModel;
  const response = await model.findOne(req.data.chatId);
  if (!isEmpty(response) && method === 'POST') {
    return ResponseHandler.error(
      res,
      statusCodes.conflict,
      statusMessages.conflict('Chat Already Exists')
    );
  }

  if (isEmpty(response) && method !== 'POST') {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Chat')
    );
  }
  if (method === 'GET') res.data = response;
  next();
};

const checkAllChats = async (req, res, next) => {
  const { url } = req;
  const groupChats =
    url === '/' || url === '/group' ? await GroupChatModel.find() : undefined;
  const privateChats =
    url === '/' || url === '/private'
      ? await PrivateChatModel.find()
      : undefined;
  const data = { privateChats, groupChats };
  if (isEmpty(data)) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Chats')
    );
  }
  res.data =
    url === '/' ? data : Object.values(data)[0] || Object.values(data)[1];
  next();
};

export { validatePostChats, validateEditChats, checkChatExist, checkAllChats };
