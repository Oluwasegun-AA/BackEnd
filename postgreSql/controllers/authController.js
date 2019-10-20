import { pick } from 'lodash';
import db from '../models';
import {
  ResponseHandler,
  statusMessages,
  statusCodes,
  Jwt
} from '../helpers';

const { success, created } = statusMessages;
const { encrypt } = Jwt;

class Auth {
  static async login(req, res) {
    return ResponseHandler.success(res, statusCodes.success, success('User Login Successful'), {
      token: encrypt(pick(res.data, ['id', 'email', 'role'])),
    });
  }

  static async signup(req, res) {
    const data = await db.postUser(req, res);
    return ResponseHandler.success(res, statusCodes.created, created('User '), {
      token: encrypt(pick(data, ['id', 'email'])),
    });
  }
}

export default Auth;
