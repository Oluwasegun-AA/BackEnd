import uuid from 'uuid';
import { pick } from 'lodash';
import Password from './passwordModem';

type Role = 'User' | 'Admin';

interface ISignupData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: Role;
  password: string;
}

interface ILoginData {
  email: string;
  password: string;
}
class ExtractValues {
  static userSignup(req: any): ISignupData {
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

  static userLogin(req: any): ILoginData {
    return pick(this.userSignup(req), ['email', 'password']);
  }
}

export default ExtractValues;
