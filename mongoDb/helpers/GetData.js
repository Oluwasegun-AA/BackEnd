import { pick } from 'lodash';

class GetData {
  static login(req) {
    return pick(req.body, ['email', 'password']);
  }

  static signup(req) {
    return pick(req.body, [
      'email',
      'password',
      'username',
      'firstName',
      'lastName',
    ]);
  }
}

export default GetData;
