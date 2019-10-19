import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { SECRETE } = process.env;

class Jwt {
  static encrypt(data) {
    return jwt.sign(data, SECRETE, {
      expiresIn: 60 * 60, // expires in 1 hour
    });
  }

  static decrypt(token) {
    jwt.verify(token, SECRETE, (err, data) => {
      if (err) return { success: false };
      return data;
    });
  }
}

export default Jwt;
