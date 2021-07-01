
// setup using pure mongo without mongoose
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
// const { DATABASE_URL } = process.env;

const database = new Promise((resolve, reject) => {
  MongoClient.connect(
    'mongodb+srv://shegs:shegs@locations.yabr5.mongodb.net/locations?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (!!err) reject(err);
      console.log({err})
      console.log({client})
      const db = client.db('locations');
      resolve(db);
    }
  );
});

export default database;



// const { MongoClient } = require("mongodb");
 
// // Replace the following with your Atlas connection string                                                                                                                                        
// const url = "mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
// const client = new MongoClient(url);

// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");

//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }

// run().catch(console.dir);