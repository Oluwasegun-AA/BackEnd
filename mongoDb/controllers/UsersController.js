import { omit, pick, isEmpty } from 'lodash';
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

const serverError = res => {
  ResponseHandler.error(
    res,
    statusCodes.serverError,
    statusMessages.serverErrorMessage()
  );
};

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
      if (err) return serverError(res);
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
    const data = isEmpty(req.body.password) ? omit(req.body, ['password']) : { ...req.body, password: Password.encrypt(req.body.password) };
    await UserModel.findOneAndUpdate(
      { id: req.params.id },
      data,
      (err, response) => {
        const value = JSON.parse(JSON.stringify(response));
        if (err) return serverError(res);
        return ResponseHandler.success(
          res,
          statusCodes.success,
          success('User Updated'),
          omit(value, ['password', '__v'])
        );
      }
    );
  }

  static async deleteUser(req, res) {
    await UserModel.deleteOne({ id: req.params.id }, (err) => {
      if (err) return serverError(res);
      return ResponseHandler.success(
        res,
        statusCodes.success,
        success('User deleted')
      );
    });
  }
}

export default Users;
