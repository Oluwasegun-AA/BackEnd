import {
  findUser,
  findAllUsers,
  findAllAdmins,
  postUser
} from './authModels';
import {
  postArticle,
  findArticle,
  updateArticle,
  deleteArticle,
  findAllArticles,
  findAllArticlesByUser,
} from './articleModels';
import findFeeds from './feedsModels';
import {
  getUser,
  deleteUser,
  updateUser,
  getAllUsers
} from './usersModel';

export default {
  findUser,
  findAllUsers,
  findAllAdmins,
  findArticle,
  findAllArticles,
  findAllArticlesByUser,
  findFeeds,
  postUser,
  postArticle,
  updateArticle,
  deleteArticle,
  getUser,
  deleteUser,
  updateUser,
  getAllUsers
};
