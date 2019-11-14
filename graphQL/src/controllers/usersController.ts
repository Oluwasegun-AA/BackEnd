import { omit } from 'lodash';
import db from '../sequelize/models';
import {
  ResponseHandler,
  statusMessages,
  statusCodes,
  status
} from '../helpers';

const { Users } = db;
const { success } = statusMessages;

class UsersController {
  static async getAllUsers(): Promise<any> {
    const users: any = await Users.findAll();
    return users;
  }

  static async getUser(data: any): Promise<any> {
    const user: any = await Users.findOne(data);
    return user;
  }

  static async updateUser(data: any): Promise<any> {
    const response = await Users.update(omit(data, ['verified', 'isAdmin']), {
      where: {
        id: data.id
      }
    })
    if (response) {
      return ResponseHandler.success(
        statusCodes.success,
        success('User Update Successful'),
        omit(response, ['password']),
      );
    }
    throw new Error(`${status.serverError}, Please try again`);
  }

  static async deleteUser(data: any): Promise<any> {
    const response = await Users.update({ isDeleted: true }, {
      where: {
        id: data.id
      }
    })
    return ResponseHandler.success(
      statusCodes.success,
      success('User deleted'),
      omit(response, ['password'])
    );
  }
  static async makeAdmin(data: any): Promise<any> {
    const user: any = await Users.findOne(data);
    const response = await Users.update({ isAdmin: !user.isAdmin }, {
      where: {
        id: data.id
      }
    });
    return ResponseHandler.success(
      statusCodes.success,
      success('Admin status updated'),
      omit(response, ['password'])
    );
  }
  static async verifyUser(data: any): Promise<any> {
    const response = await Users.update({ verified: true }, {
      where: {
        id: data.id
      }
    });
    return ResponseHandler.success(
      statusCodes.success,
      success('User verified'),
      omit(response, ['password'])
    );
  }
}

export default UsersController;
