import request from './Request';

const findFeeds = async () => {
  const res = await request.findAll('"Article"', 'ORDER BY createdAt DESC');
  return res;
};

export default findFeeds;
