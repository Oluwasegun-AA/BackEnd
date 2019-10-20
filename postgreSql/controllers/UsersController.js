import { pick } from 'lodash';
import db from '../models';
import { ResponseHandler, statusMessages, Jwt } from '../helpers';

const { success } = statusMessages;
const { encrypt } = Jwt;

class Auth {
  static async getAllUsers(req, res) {
    const data = await db.findUser(req, res);
    if (data) ResponseHandler.success(res, 200, data);
    if (!data) ResponseHandler.error(res, 404, 'login Unsuccessful');
  }

  static async getUser(req, res) {
    const data = await db.postUser(req, res);
    if (data) {
      return ResponseHandler.success(res, 200, success('User Created'), {
        token: encrypt(pick(data[0], ['id', 'email'])),
      });
    }
  }
}

export default Auth;
