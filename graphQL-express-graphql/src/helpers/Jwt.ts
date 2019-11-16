import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { status } from './status';

dotenv.config();
const { SECRETE }: any = process.env;

class Jwt {
  static encrypt(data: { id: string, isAdmin: boolean, verified: boolean  }): string {
    return jwt.sign(data, SECRETE, {
      expiresIn: 60 * 60, // expires in 1 hour
    });
  }

  static decrypt(token: string) {
    new Promise((resolve) => {
      jwt.verify(token, SECRETE, (err: any, data: any) => {
        if (err) {
          throw new Error(`${status.unauthorized}, Invalid Token`);
        }
        resolve(data);
      });
    })
  }
}

export default Jwt;
