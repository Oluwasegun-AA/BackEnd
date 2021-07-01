import { isEmpty } from 'lodash';
import { UserModel, LoginModel } from '../models';
import {
  GetData,
  validate,
  ResponseHandler,
  statusCodes
} from '../helpers';

const validateSignupData = async (req, res, next) => {
  const data = GetData.signup(req);
  const error = validate(res, UserModel, data);
  if (!isEmpty(error)) {
    return ResponseHandler.error(
      res,
      statusCodes.badRequest,
      Object.values(error.errors).flatMap(err => err.message)
    );
  }
  req.body.data = data;
  next();
};

const validateLoginData = (req, res, next) => {
  const data = GetData.login(req);
  const error = validate(res, LoginModel, data);
  if (!isEmpty(error)) {
    return ResponseHandler.error(
      res,
      statusCodes.badRequest,
      Object.values(error.errors).flatMap(err => err.message)
    );
  }
  next();
};

// const ii = async (req, res, next) => {
//   const { email } = GetData.login(req);
//   const data = await UserModel.find({ email });
//   if (data) {
//     return ResponseHandler.error(
//       res,
//       statusCodes.conflict,
//       statusMessages.badRequest('User Exists')
//     );
//   }
//   next();
// };

export { validateSignupData, validateLoginData };
