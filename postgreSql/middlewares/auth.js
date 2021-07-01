import { pick, omit } from 'lodash';
import joi from '@hapi/joi';
import { joiValidateHelper } from '../helpers';

const rules = {
  firstName: joi
    .string()
    .min(3)
    .max(30)
    .required(),
  lastName: joi
    .string()
    .min(3)
    .max(30)
    .required(),
  username: joi
    .string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: joi
    .string()
    .max(256)
    .email({ minDomainSegments: 2 })
    .required(),
  password: joi
    .string()
    .min(8)
    .max(15)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  role: joi.any().valid('User', 'Admin'),
};

const signupSchema = joi.object(omit(rules));
const loginSchema = joi.object(pick(rules, ['email', 'password']));

const validateSignupData = async (req, res, next) =>
  joiValidateHelper(req, res, next, signupSchema);

const validateLoginData = async (req, res, next) =>
  joiValidateHelper(req, res, next, loginSchema);

export { validateSignupData, validateLoginData };
