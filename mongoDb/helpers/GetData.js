import { pick } from 'lodash';

class GetData {
  static login(req) {
    return pick(req.body, ['email', 'password']);
  }

  static signup(req) {
    return pick(req.body, [
      'email',
      'username',
      'password',
    ]);
  }

  static message(req) {
    return pick(
      req.body,
      [
        'message',
        'userId',
        'roomID',
        'IP',
        'admin',
        'timestamp'
      ]);
  }
}

export default GetData;
