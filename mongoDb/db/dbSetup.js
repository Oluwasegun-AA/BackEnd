import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DATABASE_URL } = process.env;

const connect = async () => {
  const db = mongoose.connection;
  mongoose.connection.on('open', () => {
    process.stdout.write('Connected to mongo server.\n');
  });

  await mongoose.connect(
    DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    err => {
      if (err) process.stdout.write(`Could not connect to mongo server!\n ${err} \n`);
    }
  );
  return db;
};

const connection = connect();

export default connection;

// setup using pure mongo without mongoose
// import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();
// const { DATABASE_URL } = process.env;

// const database = new Promise((resolve, reject) => {
//   MongoClient.connect(
//     DATABASE_URL,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     (err, connection) => {
//       if (err) reject(err);
//       const db = connection.db('mongoDb');
//       resolve(db);
//     }
//   );
// });

// export default database;
