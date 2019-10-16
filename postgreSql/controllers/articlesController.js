import { ResponseHandler } from '../helpers';

class Articles {
  static async get(req, res) {
    return ResponseHandler.success(res, 200, 'get articles').success();
  }

  static async post(req, res) {
    return ResponseHandler.success()(res, 200, 'post articles');
  }
}

export default Articles;
