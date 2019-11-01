import { isEmpty, pick } from 'lodash';
import { UserModel } from '../models';
import {
  Jwt,
  GetData,
  ResponseHandler,
  statusCodes,
  statusMessages,
} from '../helpers';

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
  const { email } = GetData.login(req);
  const data = await UserModel.findOne({ email });
  if (!isEmpty(data) && (url === '/signup' || url === '/')) {
    return ResponseHandler.error(
      res,
      statusCodes.conflict,
      statusMessages.conflict('User Already signed up')
    );
  }
  if (isEmpty(data) && (url === '/login' || id)) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('User')
    );
  }
  if (url === '/login') {
    res.data = pick(data, ['id', 'email', 'role', 'password']);
  }
  next();
};

const checkUserInParamExist = async (req, res, next) => {
  const response = await UserModel.findById(req.params.id);
  if (!response) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('User')
    );
  }
  req.data = response;
  next();
};

const checkUserInToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const data = await Jwt.decrypt(req, res, token);
  const user = await UserModel.findOne({ id: data.id });
  const mainUser = await UserModel.findOne({ id: req.params.id });
  if ((user.id !== mainUser.id) && (user.role !== 'Admin')) {
    return ResponseHandler.error(
      res,
      statusCodes.unauthorized,
      statusMessages.unauthorized('Use authorized details')
    );
  }
  if (isEmpty(data) || isEmpty(user) || !user.role) {
    return invalidTokenMessage(res);
  }
  next();
};

const checkAdminInToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const data = await Jwt.decrypt(req, res, token);
  const user = await UserModel.findOne({ id: data.id });
  if (isEmpty(data) || isEmpty(user) || user.role !== 'Admin') {
    return invalidTokenMessage(res);
  }
  next();
};

export {
  checkUserExist,
  checkUserInParamExist,
  checkUserInToken,
  checkAdminInToken,
};
