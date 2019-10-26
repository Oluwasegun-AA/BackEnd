import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const { DATABASE_URL } = process.env;

const database = new Promise((resolve, reject) => {
  MongoClient.connect(
    DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, connection) => {
      if (err) reject(err);
      const db = connection.db('mongoDb');
      resolve(db);
    }
  );
});

export default database;
