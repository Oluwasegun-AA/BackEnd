import db from '../db/dbSetup';

const query = async (collection, method, data) => {
  const resp = await db[collection][method](data);
  return resp;
};

export default query;
