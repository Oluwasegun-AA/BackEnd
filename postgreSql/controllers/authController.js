import { ResponseHandler } from '../helpers';
import db from '../models';

class Auth {
  static async login(req, res) {
    const data = await db.findUser(req, res);
    if (data) ResponseHandler.success(res, 200, data);
    if (!data) ResponseHandler.error(res, 404, 'login Unsuccessful');
  }

  static async signup(req, res) {
    const data = await db.postUser(req, res);
    console.log('ddd', data);
    // return ResponseHandler.success(res, 200, data);
  }
}

export default Auth;
