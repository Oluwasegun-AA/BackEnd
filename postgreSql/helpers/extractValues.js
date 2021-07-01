import uuid from 'uuid/v4';
import { pick } from 'lodash';
import Password from './passwordModem';

class extractValues {
  static userSignup(req) {
    const {
      firstName,
      lastName,
      username,
      email,
      password
    } = req.body;
    return {
      id: `${uuid()}`,
      firstName,
      lastName,
      username,
      email,
      role: 'User',
      password: `${Password.encrypt(password)}`,
    };
  }

  static userLogin(req) {
    return pick(this.userSignup(req), ['email', 'password']);
  }
}

export default extractValues;
