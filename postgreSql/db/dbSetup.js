import { Pool } from 'pg';
import dotenv from 'dotenv';
import { ResponseHandler, statusCodes, statusMessages } from '../helpers';

const { serverError } = statusCodes;
const { serverErrorMessage } = statusMessages;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const query = async (queryObj, res) =>
  pool.connect((err, client, release) => {
    if (err) {
      return ResponseHandler.error(res, serverError, serverErrorMessage);
    }
    client.query(queryObj, (err, response) => {
      release();
      if (err) {
        return ResponseHandler.error(res, serverError, err);
      }
      return response;
    });
  });

export default query;
