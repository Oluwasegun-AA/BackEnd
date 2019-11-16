import { pick, omit } from 'lodash';
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
    const user = await Users.findOne({ where: omit(data, ['password']) });
    const { dataValues }: any = user;
    const validUser = Password.decrypt(data.password, dataValues.password);
    if (validUser) {
      return {
        token: encrypt(pick(dataValues, ['id', 'isAdmin', 'verified'])),
      }
    }
    throw new Error(`${status.unauthorized}, Incorrect email or password`);
  }

  static async signup(data: any) {
    const userCreated = await Users.create(data);
    if (userCreated) {
      return {
        token: encrypt(pick(data, ['id', 'isAdmin', 'verified'])),
      };
    }
    throw new Error(`${status.serverError}, User Account not created`);
  }
}

export default Auth;
