import db from '../models';
import { ResponseHandler, statusMessages, statusCodes } from '../helpers';

const { success, created } = statusMessages;

const articleSuccessResponse = (res, string, data) =>
  ResponseHandler.success(
    res,
    statusCodes.success,
    success(string),
    res.data || data
  );

class Articles {
  static async getOneArticle(req, res) {
    return articleSuccessResponse(res, 'Article Retrieved');
  }

  static async getAllArticles(req, res) {
    return articleSuccessResponse(res, 'Articles Retrieved');
  }

  static async postArticle(req, res) {
    const data = await db.postArticle(req, res);
    return ResponseHandler.success(
      res,
      statusCodes.created,
      created('Article'),
      data
    );
  }

  static async updateArticle(req, res) {
    const data = await db.updateArticle(req, res);
    return articleSuccessResponse(res, 'Article Updated', data);
  }

  static async deleteArticle(req, res) {
    const data = await db.deleteArticle(req, res);
    return articleSuccessResponse(res, 'Article deleted', data);
  }

  static async findAllArticlesByUser(req, res) {
    const data = await db.findAllArticlesByUser(req, res);
    return articleSuccessResponse(res, 'Article retrieved', data);
  }
}

export default Articles;
