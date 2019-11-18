import { omit } from 'lodash';
import db from '../sequelize/models';
import {
  status
} from '../helpers';

const { Users } = db;

import {
  ISingleUserDataValues,
  ISingleUser,
  IGetUser,
  IUpdateUser
} from '../types/typeDeclarations.interface';

class UsersController {
  static async getAllUsers(): Promise<ISingleUser> {
    const users: any = await Users.findAll({
      where: {
        isDeleted: false
      }
    });
    return users;
  }

  static async getUser(data: IGetUser): Promise<any> {
    const user: ISingleUserDataValues = await Users.findOne({ where: data });
    return omit(user.dataValues, ['password']);
  }
  static async updateUser(data: IUpdateUser): Promise<any> {
    const response = await Users.update(omit(data, ['verified', 'isAdmin']), {
      where: {
        id: data.id
      },
      returning: true,
    });
    if (response) {
      return omit(response[1][0], ['password']);
    }
    throw new Error(`${status.serverError}, Please try again`);
  }

  static async deleteUser(data: IGetUser): Promise<any> {
    const response = await Users.update({ isDeleted: true }, {
      where: data,
      returning: true,
    });
    return omit(response[1][0], ['password']);
  }

  static async makeAdmin(data: IGetUser): Promise<any> {
    const user: any = await Users.findOne({ where: data });
    if (user) {
      const response = await Users.update({ isAdmin: true }, {
        where: data,
        returning: true,
      });
      return omit(response[1][0], ['password']);
    }
    throw new Error(`${status.notFound}, User not found`)
  }
  static async verifyUser(data: any): Promise<any> {
    const user: any = await Users.findOne({ where: data });
    if (user) {
      const response = await Users.update({ verified: true }, {
        where: data,
        returning: true,
      });
      return omit(response[1][0], ['password']);
    }
    throw new Error(`${status.notFound}, User not found`);
  }
}

export default UsersController;
