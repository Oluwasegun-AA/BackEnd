import { omit, pick } from 'lodash';
import { UserModel } from '../models';
import connection from '../db/dbSetup';
import {
  Password,
  ResponseHandler,
  statusMessages,
  statusCodes,
  Jwt,
} from '../helpers';

const { success, created } = statusMessages;

class Users {
  static async getAllUsers(req, res) {
    await connection;
    const data = await UserModel.find();
    const values = JSON.parse(JSON.stringify(data));
    const response = values.flatMap(item => omit(item, ['password', '__v']));
    ResponseHandler.success(
      res,
      statusCodes.success,
      success('Users retrieved'),
      { users: response, count: response.length }
    );
  }

  static async getUser(req, res) {
    await connection;
    const data = JSON.parse(JSON.stringify(req.data));
    return ResponseHandler.success(
      res,
      statusCodes.success,
      success('User retrieved'),
      omit(data, ['password', '__v'])
    );
  }

  static async postUser(req, res) {
    await connection;
    const data = {
      ...req.body.data,
      password: Password.encrypt(req.body.password),
    };
    const model = new UserModel(data);
    await model.save((err, value) => {
      if (err) {
        return ResponseHandler.error(
          res,
          statusCodes.serverError,
          statusMessages.serverErrorMessage()
        );
      }
      return ResponseHandler.success(
        res,
        statusCodes.created,
        created('User '),
        {
          token: Jwt.encrypt(pick(value, ['id', 'email'])),
        }
      );
    });
  }

  static async updateUser(req, res) {
    const data = await db.updateUser(req, res);
    return ResponseHandler.success(
      res,
      statusCodes.success,
      success('User Updated'),
      omit(data, ['password'])
    );
  }

  static async deleteUser(req, res) {
    const data = await db.deleteUser(req, res);
    return ResponseHandler.success(
      res,
      statusCodes.success,
      success('User deleted'),
      omit(data, ['password'])
    );
  }
}

export default Users;
