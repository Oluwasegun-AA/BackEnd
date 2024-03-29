import connection from './dbSetup';
import {
  users,
  privateChats,
  groupChats,
  privateMessages,
  groupMessages,
} from './seedData';
import {
  UserModel,
  PrivateChatModel,
  GroupChatModel,
  PrivateMessageModel,
  GroupMessageModel,
} from '../models';

const dropCollections = async () => {
  const conn = await connection;
  await conn.dropDatabase();
};

const createCollections = async () => {
  UserModel.insertMany(users);
  PrivateChatModel.insertMany(privateChats);
  GroupChatModel.insertMany(groupChats);
  PrivateMessageModel.insertMany(privateMessages);
  GroupMessageModel.insertMany(groupMessages);
};

const seedDb = async () => {
  try {
    await dropCollections();
    await createCollections();
    process.stdout.write('db seeded');
  } catch (err) {
    process.stdout.write(`Seeding error ${err}`);
  }
};

seedDb();


// seeding using pure mongo without mongoose
// const dropCollections = async () => {
//   const db = await database;
//   await db.listCollections().forEach(collection => {
//     db.collection(collection.name).drop();
//   });
// };

// const createCollections = async () => {
//   const db = await database;
//   db.collection('Users').insertMany(users);
//   db.collection('PrivateChats').insertMany(privateChats);
//   db.collection('GroupChats').insertMany(groupChats);
//   db.collection('PrivateMessages').insertMany(privateMessages);
//   db.collection('GroupMessages').insertMany(groupMessages);
// };

// const seedDb = async () => {
//   try {
//     await dropCollections();
//     await createCollections();
//     process.stdout.write('db seeded');
//   } catch (err) {
//     process.stdout.write(`Seeding error ${err}`);
//   }
// };

// seedDb();
