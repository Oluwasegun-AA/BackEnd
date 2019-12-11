// import { pick } from 'lodash';
// import db from '../sequelize/models';
// import {
//   ResponseHandler,
//   statusMessages,
//   statusCodes,
//   Jwt,
//   Password,
// } from '../helpers';

// const { success, created, unauthorized } = statusMessages;
// const { encrypt } = Jwt;

// class Auth {
//   static async login(data: any) {
//     const validUser = Password.decrypt(data.password, data.hashPassword);
//     if (validUser) {
//       return ResponseHandler.success(
//         res,
//         statusCodes.success,
//         success('User Login Successful'),
//         {
//           token: encrypt(pick(res.data, ['id', 'email', 'role'])),
//         }
//       );
//     }
//     return ResponseHandler.error(
//       res,
//       statusCodes.unauthorized,
//       unauthorized('Incorrect email or password')
//     );
//   }

//   static async signup(data: any) {
//     const data = await db.postUser(req, res);
//     return ResponseHandler.success(res, statusCodes.created, created('User '), {
//       token: encrypt(pick(data, ['id', 'email'])),
//     });
//   }
// }

// export default Auth;
