import express from 'express';

import { catchAllError } from '../helpers';
import ArticlesController from '../controllers/ArticlesController';

const articles = express.Router();
const { get, post } = ArticlesController;


articles.get('/', get);

articles.post('/', post);

catchAllError(articles);

export default articles;
