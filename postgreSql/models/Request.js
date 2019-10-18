import query from '../db/dbSetup';

const arrangeValues = item =>
  `(${item.reduce((ac, c) => {
    if (ac) {
      return `${ac}","${c}`;
    }
    return `"${c}`;
  }, undefined)}")`;

class Request {
  static async findAll(res, table, whereText) {
    const queryText = `SELECT * FROM "${table}" ${whereText};`;
    const resp = await query(queryText, res);
    return resp;
  }

  static async findOne(req, res, table, column) {
    const value = req.body[`${column}`];
    const queryText = `SELECT * FROM "${table}" WHERE ${column}=${value};`;
    const resp = await query(queryText, res);
    return resp;
  }

  static async post(req, res, table, values) {
    const queryText = `INSERT INTO "${table}" ${arrangeValues(Object.keys(values))} VALUES ${arrangeValues(Object.values(values))} returning *;`;
    console.log('this', queryText);
    const resp = await query(queryText, res);
    return resp;
  }

  // static async update(req, res, table) {
  //   const body = req;
  //   let update = '';
  //   Object.keys(body).foreEach(item => (update += `"${item}"=${body.item}, `));
  //   const queryText = `UPDATE "${table}" SET ${update}returning *;`;
  //   const resp = await query(res, queryText);
  //   return resp;
  // }

  // static async delete(req, res, table) {
  //   const body = req;
  //   const queryText = `DELETE FROM "${table}" WHERE ${Object.keys(
  //     body
  //   )}=$1${Object.values(table)} (${Object.keys(body)}) VALUES (${Object.values(
  //     body
  //   )}) returning *;`;
  //   const resp = await query(res, queryText);
  //   return resp;
  // }
}

export default Request;
