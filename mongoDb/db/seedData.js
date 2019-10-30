import mongoose from 'mongoose';
import { Password } from '../helpers';

const object = mongoose.Types.ObjectId;

const users = [
  {
    firstName: 'User',
    lastName: 'test',
    username: 'user1',
    email: 'user@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
    createdAt: '2019-10-25T09:19:31.847Z'
  },
  {
    firstName: 'Admin',
    lastName: 'test',
    username: 'admin',
    email: 'admin@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'Admin',
    createdAt: '2019-10-25T09:19:31.847Z'
  },
  {
    firstName: 'test',
    lastName: 'admin',
    username: 'user2',
    email: 'test@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
    createdAt: '2019-10-25T09:19:31.847Z'
  },
  {
    firstName: 'test',
    lastName: 'admin',
    username: 'user3',
    email: 'test@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
    createdAt: '2019-10-25T09:19:31.847Z'
  },
];

const privateChats = [
  {
    chatId: object(),
    users: [
      {
        userId: object(),
        username: 'user1',
      },
      {
        userId: object(),
        username: 'admin',
      },
    ],
    createdAt: '2019-10-25T09:19:31.847Z'
  },
  {
    chatId: object(),
    users: [
      {
        userId: object(),
        username: 'user2',
      },
      {
        userId: object(),
        username: 'user3',
      },
    ],
    createdAt: '2019-10-25T09:19:31.847Z'
  },
];

const groupChats = [
  {
    chatId: object(),
    users: [
      {
        userId: object(),
        username: 'user1',
      },
      {
        userId: object(),
        username: 'admin',
      },
      {
        userId: object(),
        username: 'user2',
      },
    ],
    createdAt: '2019-10-25T09:19:31.847Z'
  },
  {
    chatId: object(),
    users: [
      {
        userId: object(),
        username: 'user2',
      },
      {
        userId: object(),
        username: 'admin',
      },
      {
        userId: object(),
        username: 'user1',
      },
      {
        userId: object(),
        username: 'user3',
      },
    ],
    createdAt: '2019-10-25T09:19:31.847Z'
  }
];

const privateMessages = [
  {
    chatId: object(),
    userId: object(),
    message: 'Hello, participant, Hope you are enjoying the platform',
    createdAt: '2019-10-25T09:19:31.847Z'
  },
  {
    chatId: object(),
    userId: object(),
    message: 'Yes,  I am. Thanks for checking up',
    createdAt: '2019-10-25T09:19:31.847Z'
  },
  {
    chatId: object(),
    userId: object(),
    message: 'You are welcome.',
    createdAt: '2019-10-25T09:19:31.847Z'
  }
];

const groupMessages = [
  {
    chatId: object(),
    userId: object(),
    message: 'Hello, Good day!',
    createdAt: '2019-10-25T09:19:31.847Z'
  },
  {
    chatId: object(),
    userId: object(),
    message: 'Hi Admin, How are you doing?',
    createdAt: '2019-10-25T09:19:31.847Z'
  },
  {
    chatId: object(),
    userId: object(),
    message: 'best Admin in the world, how are you doing?',
    createdAt: '2019-10-25T09:19:31.847Z'
  }
];

export {
  users,
  privateChats,
  groupChats,
  privateMessages,
  groupMessages
};
