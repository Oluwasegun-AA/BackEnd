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

  static chat(req) {
    return pick(req.body, ['users']);
  }
}

export default GetData;
