import database from './dbSetup';
import {
  users,
  privateChats,
  groupChats,
  privateMessages,
  groupMessages,
} from './seedData';

const dropCollections = async () => {
  const db = await database;
  await db.listCollections().forEach(collection => {
    db.collection(collection.name).drop();
  });
};

const createCollections = async () => {
  const db = await database;
  db.collection('Users').insertMany(users);
  db.collection('PrivateChats').insertMany(privateChats);
  db.collection('GroupChats').insertMany(groupChats);
  db.collection('PrivateMessages').insertMany(privateMessages);
  db.collection('GroupMessages').insertMany(groupMessages);
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
