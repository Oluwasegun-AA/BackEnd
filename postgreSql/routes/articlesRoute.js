import express from 'express';

import { catchAllError } from '../helpers';
import ArticlesController from '../controllers/ArticlesController';
import {
  validatePostArticles,
  validateEditArticles,
  checkArticleExist,
  checkAllArticles,
} from '../middlewares';

const articles = express.Router();
const {
  getOneArticle,
  postArticle,
  getAllArticles,
  updateArticle,
  deleteArticle
} = ArticlesController;

articles.get('/', checkAllArticles, getAllArticles);
articles.get('/:slug', checkArticleExist, getOneArticle);
articles.delete('/:slug', checkArticleExist, deleteArticle);

articles.post('/', validatePostArticles, checkArticleExist, postArticle);
articles.patch(
  '/:slug',
  validateEditArticles,
  checkArticleExist,
  updateArticle
);

catchAllError(articles);

export default articles;
