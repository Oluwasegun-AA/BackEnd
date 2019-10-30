import mongoose from 'mongoose';
import { Password } from '../helpers';

const object = mongoose.Types.ObjectId;

const user1 = object();
const user2 = object();
const user3 = object();
const user4 = object();

const privateChat1 = object();
const privateChat2 = object();

const groupChat1 = object();
const groupChat2 = object();

const users = [
  {
    _id: user1,
    firstName: 'User',
    lastName: 'test',
    username: 'user1',
    email: 'user@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    _id: user2,
    firstName: 'Admin',
    lastName: 'test',
    username: 'admin',
    email: 'admin@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'Admin',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    _id: user3,
    firstName: 'test',
    lastName: 'admin',
    username: 'user2',
    email: 'test@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    _id: user4,
    firstName: 'test',
    lastName: 'admin',
    username: 'user3',
    email: 'test@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
];

const privateChats = [
  {
    _id: privateChat1,
    users: [
      object()
    ],
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    _id: privateChat2,
    users: [
      object()
    ],
    createdAt: '2019-10-25T09:19:31.847Z',
  },
];

const groupChats = [
  {
    _id: groupChat1,
    users: [
      object()
    ],
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    _id: groupChat2,
    users: [
      object()
    ],
    createdAt: '2019-10-25T09:19:31.847Z',
  },
];

const privateMessages = [
  {
    _id: object(),
    chatId: privateChat1,
    userId: user1,
    message: 'Hello, participant, Hope you are enjoying the platform',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    _id: object(),
    chatId: privateChat1,
    userId: user2,
    message: 'Yes,  I am. Thanks for checking up',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    _id: object(),
    chatId: privateChat1,
    userId: user1,
    message: 'You are welcome.',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
];

const groupMessages = [
  {
    _id: object(),
    chatId: groupChat1,
    userId: user1,
    message: 'Hello, Good day!',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    _id: object(),
    chatId: groupChat1,
    userId: user2,
    message: 'Hi Admin, How are you doing?',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    _id: object(),
    chatId: groupChat1,
    userId: user3,
    message: 'best Admin in the world, how are you doing?',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
];

export {
  users,
  privateChats,
  groupChats,
  privateMessages,
  groupMessages
};
