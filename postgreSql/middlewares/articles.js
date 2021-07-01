import joi from '@hapi/joi';
import { omit } from 'lodash';
import {
  joiValidateHelper,
  ResponseHandler,
  statusCodes,
  statusMessages,
} from '../helpers';
import db from '../models';

const rules = {
  slug: joi
    .string()
    .min(3)
    .max(50)
    .required(),
  description: joi
    .string()
    .min(3)
    .max(100)
    .required(),
  body: joi.string().required(),
  tagId: joi.string().guid({
    version: ['uuidv4'],
  }),
  authorId: joi.string().guid({
    version: ['uuidv4'],
  }),
};

const postArticlesSchema = joi.object(omit(rules, ['slug']));
const editArticlesSchema = joi.object(rules);

const validatePostArticles = async (req, res, next) =>
  joiValidateHelper(req, res, next, postArticlesSchema);

const validateEditArticles = async (req, res, next) =>
  joiValidateHelper(req, res, next, editArticlesSchema);

const checkArticleExist = async (req, res, next) => {
  const { method } = req;
  const response = await db.findArticle(req, res);
  if (response && method === 'POST') {
    return ResponseHandler.error(
      res,
      statusCodes.conflict,
      statusMessages.conflict('Article Already Exists')
    );
  }

  if (!response && method !== 'POST') {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Article')
    );
  }
  if (method === 'GET') res.data = response;
  next();
};

const checkAllArticles = async (req, res, next) => {
  const response = await db.findAllArticles(req, res);
  if (!response) {
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Articles')
    );
  }
  res.data = response;
  next();
};

export {
  validatePostArticles,
  validateEditArticles,
  checkArticleExist,
  checkAllArticles,
};
