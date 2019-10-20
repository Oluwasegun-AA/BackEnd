import { Pool } from 'pg';
import dotenv from 'dotenv';
import { ResponseHandler, statusCodes, statusMessages } from '../helpers';

const { serverError } = statusCodes;
const { serverErrorMessage } = statusMessages;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', err => {
  process.stdout.write('Unexpected error on idle client', `${err}\n`);
});

const query = async (queryObj, res) => {
  const client = await pool.connect();
  try {
    const response = await client.query(queryObj);
    return response.rows;
  } catch (err) {
    return ResponseHandler.error(res, serverError, serverErrorMessage());
  }
};

export default query;
