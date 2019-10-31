import { isEmpty } from 'lodash';
import mongoose from 'mongoose';
import { GroupChatModel, PrivateChatModel } from '../models';

import {
  ResponseHandler,
  statusCodes,
  statusMessages,
  validate,
  GetData,
} from '../helpers';

const { ObjectId } = mongoose.Types;
const validatePostChats = async (req, res, next) => {
  const data = { ...GetData.chat(req), chatId: ObjectId() };
  const model = req.url === '/group' ? GroupChatModel : PrivateChatModel;
  const error = validate(model, data);
  if (!isEmpty(error)) {
    return ResponseHandler.error(
      res,
      statusCodes.badRequest,
      Object.values(error.errors).flatMap(err => err.message)
    );
  }
  req.data = data.users;
  next();
};

// const validateEditChats = async (req, res, next) => '';
// // joiValidateHelper(req, res, next, editArticlesSchema);

const checkChatExist = async (req, res, next) => {
  const { method, url, data } = req;
  const model = url === '/group' ? GroupChatModel : PrivateChatModel;
  const query = {
    $or: [
      { 'users.userId': ObjectId(`${data[0].userId}`) },
      { 'users.userId': ObjectId(`${data[1].userId}`) },
    ],
  };
  const response = await model.findOne(query);
  if (isEmpty(response) && method !== 'POST') {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Chat')
    );
  }
  res.data = response;
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

const checkUserHasChats = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const groupChats =
    (await GroupChatModel.find({ 'users.userId': id })) || undefined;
  const privateChats =
    (await PrivateChatModel.find({ 'users.userId': id })) || undefined;
  const data = { privateChats, groupChats };
  if (isEmpty(data)) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Chats')
    );
  }
  res.data = data;
  next();
};

const checkChatIdExists = async (req, res, next) => {
  const {
    url,
    params: { id },
  } = req;
  const model = url.includes('/group') ? GroupChatModel : PrivateChatModel;
  const response = await model.findById(id);
  if (isEmpty(response)) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Chat')
    );
  }
  res.data = response;
  next();
};

const checkUserIsAdmin = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const response = await GroupChatModel.findOne({
    admin: body.userId,
    _id: id,
  });
  if (isEmpty(response)) {
    return ResponseHandler.error(
      res,
      statusCodes.unauthorized,
      statusMessages.unauthorized('Only Admins can edit or delete the groups')
    );
  }
  res.data = response;
  next();
};

const checkUserInChat = async (req, res, next) => {
  const {
    body: { userId },
    params: { id },
  } = req;
  const query = {
    $and: [
      { 'users.userId': ObjectId(`${userId}`) },
      { _id: ObjectId(`${id}`) },
    ],
  };
  const response = await PrivateChatModel.findOne(query);
  if (isEmpty(response)) {
    return ResponseHandler.error(
      res,
      statusCodes.unauthorized,
      statusMessages.unauthorized()
    );
  }
  res.data = response;
  next();
};

export {
  validatePostChats,
  checkChatExist,
  checkUserInChat,
  checkAllChats,
  checkChatIdExists,
  checkUserHasChats,
  checkUserIsAdmin,
};
