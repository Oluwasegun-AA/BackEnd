import { pick } from 'lodash';
import { UserModel } from '../models';
import connection from '../db/dbSetup';
import {
  ResponseHandler,
  statusMessages,
  statusCodes,
  Jwt,
  Password,
} from '../helpers';

const { success, created, unauthorized } = statusMessages;
const { encrypt } = Jwt;

class Auth {
  static async login(req, res) {
    const validUser = Password.decrypt(req.body.password, res.data.password);
    if (validUser) {
      return ResponseHandler.success(
        res,
        statusCodes.success,
        success('User Login Successful'),
        {
          token: encrypt(pick(res.data, ['id', 'email', 'role'])),
        }
      );
    }
    return ResponseHandler.error(
      res,
      statusCodes.unauthorized,
      unauthorized('Incorrect email or password')
    );
  }

  static async signup(req, res) {
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
          token: encrypt(pick(value, ['id', 'email'])),
        }
      );
    });
  }
}

export default Auth;
