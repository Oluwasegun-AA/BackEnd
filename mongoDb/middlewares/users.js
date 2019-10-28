import { isEmpty, pick } from 'lodash';
import { UserModel } from '../models';
import {
  GetData,
  ResponseHandler,
  statusCodes,
  statusMessages,
} from '../helpers';

// import {
//   ResponseHandler,
//   statusCodes,
//   statusMessages,
//   Jwt
// } from '../helpers';

// import request from '../models/requestController';

// const invalidTokenMessage = res => {
//   ResponseHandler.error(
//     res,
//     statusCodes.unauthorized,
//     statusMessages.unauthorized('Invalid Token')
//   );
// };

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
  const response = await UserModel.findOne({ id: req.params.id });
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

// const checkUserInToken = async (req, res, next) => {
//   const token = req.headers['x-access-token'];
//   Jwt.decrypt(req, res, token);
//   const response = await request.findTokenUser(req, res);
//   if (!response) return invalidTokenMessage(res);
//   next();
// };

// const checkAdminInToken = async (req, res, next) => {
//   const token = req.headers['x-access-token'];
//   Jwt.decrypt(req, res, token);
//   const { role } = await request.findTokenUser(req, res);
//   if (role !== 'Admin') return invalidTokenMessage(res);
//   next();
// };

// export {
//   checkUserExist,
//   checkUserInToken,
//   checkAdminInToken,
//   checkUserInParamExist,
// };

export { checkUserExist, checkUserInParamExist };
