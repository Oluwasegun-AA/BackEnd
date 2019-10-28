import ResponseHandler from './ResponseHandler';
import { statusCodes } from './status';

// const extractJoiErrorMessage = error => {
//   const { message } = error.details[0];
//   return message
//     .replace(/"/g, '');
// };

// const joiValidateHelper = async (req, res, next, schema) => {
//   try {
//     await schema.validateAsync(req.body);
//     next();
//   } catch (err) {
//     const msg = extractJoiErrorMessage(err);
//     ResponseHandler.error(
//       res,
//       statusCodes.badRequest,
//       statusMessages.badRequest(msg)
//     );
//   }
// };

const validate = (res, Model, data) => {
  const newModel = new Model(data);
  const error = newModel.validateSync();
  if (error) {
    return ResponseHandler.error(
      res,
      statusCodes.badRequest,
      Object.values(error.errors).flatMap(err => err.message)
    );
  }
};

export default validate;
