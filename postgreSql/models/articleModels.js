import request from './Request';

const findArticle = async req => {
  const res = await request.findOne(req, '"Articles"', 'id');
  return res;
};

const findAllArticles = async () => {
  const res = await request.findAll('"Articles"');
  return res;
};

const findAllArticlesByUser = async (req) => {
  const id = req.body;
  const res = await request.findAll('"Articles"', `where "authorId"=${id};`);
  return res;
};

export { findArticle, findAllArticles, findAllArticlesByUser };
