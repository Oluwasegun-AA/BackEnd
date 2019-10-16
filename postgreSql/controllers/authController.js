import { ResponseHandler } from '../helpers';

class Auth {
  static async login(req, res) {
    return ResponseHandler.success(res, 200, 'login').success();
  }

  static async signup(req, res) {
    return ResponseHandler.success()(res, 200, 'signup');
  }
}

export default Auth;
