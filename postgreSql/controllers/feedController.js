import { ResponseHandler } from '../helpers';

class Feed {
  static async get(req, res) {
    return ResponseHandler.success(res, 200, 'get feed');
  }

  static async post(req, res) {
    return ResponseHandler.success()(res, 200, 'post feed');
  }
}

export default Feed;
