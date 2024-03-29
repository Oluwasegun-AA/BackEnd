import { pick, omit } from 'lodash';
import db from '../sequelize/models';
import {
  Jwt,
  Password,
  status,
  Mail
} from '../helpers';
import {
  ILoginData,
  ISingleUserDataValues,
  ISingleUser
} from '../types/typeDeclarations.interface';

const { Users } = db;

const { encrypt } = Jwt;

class Auth {
  static async login(data: ILoginData) {
    const user: any = await Users.findOne({ where: omit(data, ['password']) });
    const { dataValues }: ISingleUserDataValues = user;
    const validUser = Password.decrypt(data.password, dataValues.password);
    if (validUser) {
      return {
        token: encrypt(pick(dataValues, ['id', 'isAdmin', 'verified'])),
      };
    }
    throw new Error(`${status.unauthorized}, Incorrect email or password`);
  }

  static async signup(data: any) {
    const userCreated: ISingleUser = await Users.create(data);
    if (userCreated) {
      const token: string = encrypt(pick(userCreated, ['id', 'isAdmin', 'verified']));
      await Mail.signUpSuccess(token, userCreated);
      return {
        token
      };
    }
    throw new Error(`${status.serverError}, User Account not created`);
  }
}

export default Auth;
