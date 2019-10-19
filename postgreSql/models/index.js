import {
  findUser,
  findAllUsers,
  findAllAdmins,
  postUser
} from './authModels';
import {
  findArticle,
  findAllArticles,
  findAllArticlesByUser,
} from './articleModels';
import findFeeds from './feedsModels';

export default {
  findUser,
  findAllUsers,
  findAllAdmins,
  findArticle,
  findAllArticles,
  findAllArticlesByUser,
  findFeeds,
  postUser,
};
