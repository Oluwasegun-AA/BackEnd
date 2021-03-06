import query from '../db/dbSetup';
import { slugify } from '../helpers';

const arrangeValues = (item, replaceQuotes) => {
  const value = `(${item.reduce((ac, c) => {
    if (ac) {
      return `${ac}","${c}`;
    }
    return `"${c}`;
  }, undefined)}")`;
  return replaceQuotes ? value.replace(/"/g, "'") : value;
};

class Request {
  static async findAll(res, table, whereText) {
    const queryText = `SELECT * FROM "${table}" ${whereText};`;
    const resp = await query(queryText, res);
    return resp;
  }

  static async findOne(req, res, table, column) {
    const value =
      req.params[column] ||
      req.body[column] ||
      slugify(
        req.body.description
          .split(' ')
          .splice(0, 10)
          .join(' ')
      );
    const queryText = `SELECT * FROM "${table}" WHERE "${column}"='${value}';`;
    const resp = await query(queryText, res);
    return resp[0];
  }

  static async findTokenUser(req, res) {
    const value = req['tokenEmail'];
    const queryText = `SELECT * FROM "Users" WHERE "email"='${value}';`;
    const resp = await query(queryText, res);
    return resp[0];
  }

  static async post(req, res, table, values) {
    const queryText = `INSERT INTO "${table}" ${arrangeValues(
      Object.keys(values)
    )} VALUES ${arrangeValues(
      Object.values(values),
      'singleQuote'
    )} returning *;`;
    const resp = await query(queryText, res);
    return resp[0];
  }

  static async update(req, res, table, whereText) {
    const { body } = req;
    const data = { ...body, updatedAt: new Date().toISOString() };
    let update = '';
    Object.keys(data).forEach(item => (update += `"${item}"='${data[item]}',`));
    const queryText = `UPDATE "${table}" SET ${update.replace(
      /,$/,
      ''
    )} ${whereText} returning *;`;
    const resp = await query(queryText, res);
    return resp[0];
  }

  static async delete(req, res, table, whereText) {
    const queryText = `DELETE FROM "${table}" ${whereText} returning *;`;
    const resp = await query(queryText, res);
    return resp[0];
  }
}

export default Request;
