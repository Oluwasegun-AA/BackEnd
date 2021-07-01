import bcrypt from 'bcrypt';

class Password {
  static encrypt(password: string): any {
    return bcrypt.hashSync(password, 10);
  }

  static decrypt(password: string, hash: string): any {
    return bcrypt.compareSync(password, hash);
  }
}

export default Password;
