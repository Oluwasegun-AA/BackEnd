import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ResponseHandler from './errorHandler';
import { statusCodes, statusMessages } from './status';

dotenv.config();
const { SECRETE }: any = process.env;

class Jwt {
  static encrypt(data: {email: string}): string {
    return jwt.sign(data, SECRETE, {
      expiresIn: 60 * 60, // expires in 1 hour
    });
  }

  static decrypt(req: any, res: any, token: string) {
    jwt.verify(token, SECRETE, (err: any, data: any) => {
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
