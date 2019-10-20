import db from '../models';
import {
  ResponseHandler,
  statusCodes,
  statusMessages,
  Jwt
} from '../helpers';

const checkUserExist = async (req, res, next) => {
  const { url } = req;
  const response = await db.findUser(req, res);
  if (response && url === '/signup') {
    return ResponseHandler.error(
      res,
      statusCodes.conflict,
      statusMessages.conflict('User Already signed up')
    );
  }
  if (!response && url === '/login') {
    return ResponseHandler.error(
      res,
      statusCodes.unauthorized,
      statusMessages.unauthorized('User does not exist, please signup')
    );
  }
  if (url === '/login') res.data = response;
  next();
};

const checkUserInToken = async (req, res, next) => {
  const invalidToken = () => {
    ResponseHandler.error(
      res,
      statusCodes.unauthorized,
      statusMessages.unauthorized('Invalid Token')
    );
  };
  const token = req.headers['x-access-token'];
  Jwt.decrypt(req, res, token);
  const response = await db.findUser(req, res);
  if (!response) return invalidToken();
  next();
};

export { checkUserExist, checkUserInToken };
