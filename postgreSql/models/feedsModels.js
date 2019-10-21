import request from './Request';

const findFeeds = async (req, res) => {
  const resp = await request.findAll(res, 'Articles', 'ORDER BY "createdAt" DESC');
  return resp;
};

export default findFeeds;
