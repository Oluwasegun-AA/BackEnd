import { isEmpty } from 'lodash';
import mongoose from 'mongoose';
import { GroupMessageModel, PrivateMessageModel } from '../models';

import {
  ResponseHandler,
  statusCodes,
  statusMessages,
  validate,
  GetData,
} from '../helpers';

const { ObjectId } = mongoose.Types;
const validatePostMessages = async (req, res, next) => {
  const data = { ...GetData.message(req), _id: ObjectId() };
  const model = req.url === '/group' ? GroupMessageModel : PrivateMessageModel;
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

const checkMessageExist = async (req, res, next) => {
  const { method, url } = req;
  const model = url === '/group' ? GroupMessageModel : PrivateMessageModel;
  const response = await model.findById(req.params.id);
  if (isEmpty(response) && method !== 'POST') {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Message')
    );
  }
  res.data = response;
  next();
};

const checkAllMessages = async (req, res, next) => {
  const { url } = req;
  const groupMessages =
    url === '/' || url === '/group'
      ? await GroupMessageModel.find()
      : undefined;
  const privateMessages =
    url === '/' || url === '/private'
      ? await PrivateMessageModel.find()
      : undefined;
  const data = { privateMessages, groupMessages };
  if (isEmpty(data)) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Messages')
    );
  }
  res.data =
    url === '/' ? data : Object.values(data)[0] || Object.values(data)[1];
  next();
};

const checkUserHasMessages = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const groupMessages =
    (await GroupMessageModel.find({ userId: id })) || undefined;
  const privateMessages =
    (await PrivateMessageModel.find({ userId: id })) || undefined;
  const data = { privateMessages, groupMessages };
  if (isEmpty(data)) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Messages')
    );
  }
  res.data = data;
  next();
};

const checkMessageIdExists = async (req, res, next) => {
  const {
    url,
    params: { id },
  } = req;
  const model = url.includes('/group')
    ? GroupMessageModel
    : PrivateMessageModel;
  const response = await model.findById(id);
  if (isEmpty(response)) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Message')
    );
  }
  res.data = response;
  next();
};

const checkUserOwnsMessage = async (req, res, next) => {
  const {
    url,
    body: { userId },
    params: { id },
  } = req;
  const query = {
    $and: [
      { userId },
      { _id: ObjectId(`${id}`) },
    ],
  };
  const model = url.includes('/group')
    ? GroupMessageModel
    : PrivateMessageModel;
  const response = await model.findOne(query);
  if (isEmpty(response)) {
    return ResponseHandler.error(
      res,
      statusCodes.unauthorized,
      statusMessages.unauthorized('you need to own the message to edit / delete it')
    );
  }
  res.data = response;
  next();
};

// const checkUserOwnsMessage = async (req, res, next) => {
//   const {
//     url,
//     body: { userId },
//     params: { id },
//   } = req;
//   const model = url.includes('/group')
//     ? GroupMessageModel
//     : PrivateMessageModel;

//   const response = await model.findOne({ _id: id, userId });
//   if (isEmpty(response)) {
//     return ResponseHandler.error(
//       res,
//       statusCodes.unauthorized,
//       statusMessages.unauthorized(' you need to won the message to edit it')
//     );
//   }
//   next();
// };

export {
  validatePostMessages,
  checkMessageExist,
  checkUserOwnsMessage,
  checkAllMessages,
  checkMessageIdExists,
  checkUserHasMessages,
};
