import ResponseHandler from './ResponseHandler';
import { statusCodes, statusMessages } from './constants';

const extractJoiErrorMessage = error => {
  const { message } = error.details[0];
  return message
    .replace(/"/g, '');
};

const joiValidateHelper = async (req, res, next, schema) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    const msg = extractJoiErrorMessage(err);
    ResponseHandler.error(
      res,
      statusCodes.badRequest,
      statusMessages.badRequest(msg)
    );
  }
};

export { joiValidateHelper, extractJoiErrorMessage };
