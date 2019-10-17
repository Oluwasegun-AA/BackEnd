import query from '../db/dbSetup';

class Request {
 static indAll (table) {
  const queryText = `select * from ${table}`;
  return query(queryText);
};

 static findOne (table, item, value) {
  const queryText = `select * from ${table} where ${item} = ${value}`;
  return query(queryText);
};
}

export const
