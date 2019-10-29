import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ResponseHandler from './ResponseHandler';
import { statusCodes, statusMessages } from './status';

dotenv.config();
const { SECRETE } = process.env;

class Jwt {
  static encrypt(data) {
    return jwt.sign(data, SECRETE, {
      expiresIn: 60 * 60, // expires in 1 hour
    });
  }

  static decrypt(req, res, token) {
    return new Promise((resolve) => {
      jwt.verify(token, SECRETE, (err, data) => {
        if (err) {
          return ResponseHandler.error(
            res,
            statusCodes.unauthorized,
            statusMessages.unauthorized('Invalid Token')
          );
        }
        resolve(data);
      });
    });
  }
}

export default Jwt;
