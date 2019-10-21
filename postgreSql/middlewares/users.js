import db from '../models';
import {
  ResponseHandler,
  statusCodes,
  statusMessages,
  Jwt
} from '../helpers';

import request from '../models/requestController';

const invalidTokenMessage = res => {
  ResponseHandler.error(
    res,
    statusCodes.unauthorized,
    statusMessages.unauthorized('Invalid Token')
  );
};

const checkUserExist = async (req, res, next) => {
  const {
    url,
    params: { id },
  } = req;
  const response = await db.findUser(req, res);
  if (response && (url === '/signup' || url === '/')) {
    return ResponseHandler.error(
      res,
      statusCodes.conflict,
      statusMessages.conflict('User Already signed up')
    );
  }
  if (!response && (url === '/login' || id)) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('User')
    );
  }
  if (url === '/login') res.data = response;
  next();
};

const checkUserInParamExist = async (req, res, next) => {
  const response = await db.getUser(req, res);
  if (!response) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('User')
    );
  }
  next();
};

const checkUserInToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  Jwt.decrypt(req, res, token);
  const response = await request.findTokenUser(req, res);
  if (!response) return invalidTokenMessage(res);
  next();
};

const checkAdminInToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  Jwt.decrypt(req, res, token);
  const { role } = await request.findTokenUser(req, res);
  if (role !== 'Admin') return invalidTokenMessage(res);
  next();
};

export {
  checkUserExist,
  checkUserInToken,
  checkAdminInToken,
  checkUserInParamExist,
};
