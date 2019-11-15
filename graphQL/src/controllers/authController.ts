import { pick } from 'lodash';
import db from '../sequelize/models';
import {
  Jwt,
  Password,
  status
} from '../helpers';

const { Users } = db;

const { encrypt } = Jwt;

class Auth {
  static async login(data: any) {
    const user = await Users.findOne(data);
    const validUser = Password.decrypt(data.password, user.password);
    if (validUser) {
      return {
        token: encrypt(pick(data, ['id', 'email', 'role'])),
      }
    }
    throw new Error(`${status.unauthorized}, Incorrect email or password`);
  }

  static async signup(data: any) {
    const userCreated = await Users.create(data);
    if (userCreated) {
      return {
        token: encrypt(pick(data, ['id', 'email'])),
      };
    }
    throw new Error(`${status.serverError}, User Account not created`);
  }
}

export default Auth;
