import { ResponseHandler } from '../helpers';

class Feed {
  static async get(req, res) {
    return ResponseHandler.success(res, 200, 'get feed');
  }
}

export default Feed;
