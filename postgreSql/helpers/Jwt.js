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
    jwt.verify(token, SECRETE, (err, data) => {
      if (err) {
        return ResponseHandler.error(
          res,
          statusCodes.unauthorized,
          statusMessages.unauthorized('Invalid Token')
        );
      }
      req.tokenEmail = data.email;
    });
  }
}

export default Jwt;
