import { UserModel, LoginModel } from '../models';
import {
  GetData,
  validate
} from '../helpers';

const validateSignupData = async (req, res, next) => {
  const data = GetData.signup(req);
  validate(res, UserModel, data);
  req.body.data = data;
  next();
};

const validateLoginData = (req, res, next) => {
  const data = GetData.login(req);
  validate(res, LoginModel, data);
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
