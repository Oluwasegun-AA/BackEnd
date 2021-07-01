import { omit } from 'lodash';
import db from '../models';
import {
  ResponseHandler,
  statusMessages,
  statusCodes
} from '../helpers';

const { success, created } = statusMessages;

class Users {
  static async getAllUsers(req, res) {
    const data = await db.getAllUsers(req, res);
    const response = data.flatMap(data => omit(data, ['password']));
    ResponseHandler.success(res, statusCodes.success, success('Users retrieved'), { users: response, count: response.length });
  }

  static async getUser(req, res) {
    const data = await db.getUser(req, res);
    return ResponseHandler.success(
      res,
      statusCodes.success,
      success('User retrieved'),
      omit(data, ['password'])
    );
  }

  static async postUser(req, res) {
    const data = await db.postUser(req, res);
    return ResponseHandler.success(
      res,
      statusCodes.created,
      created('User'),
      omit(data, ['password'])
    );
  }

  static async updateUser(req, res) {
    const data = await db.updateUser(req, res);
    return ResponseHandler.success(res, statusCodes.success, success('User Updated'), omit(data, ['password']));
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
