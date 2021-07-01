import { isEmpty } from 'lodash';

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

const checkEvery = data =>
  data.every(data => isEmpty(data.userId) && isEmpty(data.username));

const validate = (Model, data) => {
  const newModel = new Model(data);
  const error = newModel.validateSync();
  return error;
};

const validatePath = async (schema, pathName) => {
  schema
    .path(pathName)
    .validate(
      data => !checkEvery(data),
      `Bad request, ${pathName} not supplied or invalid `
    );
};

export { validate, validatePath };
