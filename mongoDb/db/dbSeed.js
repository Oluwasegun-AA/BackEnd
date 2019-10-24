import uuid from 'uuid/v4';

import { Password } from '../helpers';
import database from './dbSetup';

const user = [
  {
    id: `${uuid()}`,
    firstName: 'User',
    lastName: 'test',
    username: 'user',
    email: 'user@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
  },
  {
    id: `${uuid()}`,
    firstName: 'Admin',
    lastName: 'test',
    username: 'admin',
    email: 'admin@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'Admin',
  },
  {
    id: `${uuid()}`,
    firstName: 'test',
    lastName: 'admin',
    username: 'user',
    email: 'test@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
  },
];

const initializeDb = async () => {
  try {
    await seedDb();
  } catch (err) {
    process.stdout.write(`${err}\n`);
  }
  process.stdout.write('All Tables created successfully!\n');
};

initializeDb();
