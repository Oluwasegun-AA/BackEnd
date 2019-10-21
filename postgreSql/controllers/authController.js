import { pick } from 'lodash';
import db from '../models';
import {
  ResponseHandler,
  statusMessages,
  statusCodes,
  Jwt,
  Password,
} from '../helpers';

const { success, created, unauthorized } = statusMessages;
const { encrypt } = Jwt;

class Auth {
  static async login(req, res) {
    const validUser = Password.decrypt(req.body.password, res.data.password);
    if (validUser) {
      return ResponseHandler.success(
        res,
        statusCodes.success,
        success('User Login Successful'),
        {
          token: encrypt(pick(res.data, ['id', 'email', 'role'])),
        }
      );
    }
    return ResponseHandler.error(
      res,
      statusCodes.unauthorized,
      unauthorized('Incorrect email or password')
    );
  }

  static async signup(req, res) {
    const data = await db.postUser(req, res);
    return ResponseHandler.success(res, statusCodes.created, created('User '), {
      token: encrypt(pick(data, ['id', 'email'])),
    });
  }
}

export default Auth;
