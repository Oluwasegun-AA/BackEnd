import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const query = async queryObj =>
  pool.connect((err, client, release) => {
    if (err) {
      return process.stdout.write('Error acquiring client', `${err.stack}\n`);
    }
    client.query(queryObj, (err, response) => {
      release();
      if (err) {
        return process.stdout.write('Error executing query', `${err.stack}\n`);
      }
      return response.rows;
    });
  });

export default query;
