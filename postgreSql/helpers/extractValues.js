import uuid from 'uuid/v4';
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
    const { email, password } = req.body;
    return {
      email,
      password: `${Password.encrypt(password)}`,
    };
  }
}

export default extractValues;
