import uuid from 'uuid/v4';
import request from './requestController';

const findArticle = async (req, res) => {
  const resp = await request.findOne(req, res, 'Articles', 'slug');
  return resp;
};

const findAllArticles = async (req, res) => {
  const resp = await request.findAll(res, 'Articles', '');
  return resp;
};

const findAllArticlesByUser = async (req, res) => {
  const { id } = req.params;
  const resp = await request.findAll(res, 'Articles', `where "authorId"='${id}'`);
  return resp;
};

const postArticle = async (req, res) => {
  const { body } = req;
  const data = { ...body, id: uuid() };
  const resp = await request.post(req, res, 'Articles', data);
  return resp;
};

const updateArticle = async (req, res) => {
  const { slug } = req.params;
  const resp = await request.update(
    req,
    res,
    'Articles',
    `WHERE "slug"='${slug}'`
  );
  return resp;
};

const deleteArticle = async (req, res) => {
  const { slug } = req.params;
  const resp = await request.delete(
    req,
    res,
    'Articles',
    `WHERE "slug"='${slug}'`
  );
  return resp;
};

export {
  postArticle,
  findArticle,
  deleteArticle,
  updateArticle,
  findAllArticles,
  findAllArticlesByUser,
};
