import { ResponseHandler } from '../helpers';

class Auth {
  static async login(req, res) {
    return ResponseHandler.success(res, 200, 'login');
  }

  static async signup(req, res) {
    return ResponseHandler.success()(res, 200, 'signup');
  }
}

export default Auth;
