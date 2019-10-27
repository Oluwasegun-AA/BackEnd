import { Password } from '../helpers';

const users = [
  {
    id: '67f2b05c-de4a-4f7a-a55d-2b8a10159a1c',
    firstName: 'User',
    lastName: 'test',
    username: 'user1',
    email: 'user@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    id: '2133ceb2-a218-4b67-bf31-8878351d3e27',
    firstName: 'Admin',
    lastName: 'test',
    username: 'admin',
    email: 'admin@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'Admin',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    id: '32e73174-6cbc-4627-9be1-3450b5b87fa0',
    firstName: 'test',
    lastName: 'admin',
    username: 'user2',
    email: 'test@email.com',
    password: `${Password.encrypt('password')}`,
    role: 'User',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    id: '98864a68-b16b-494e-986d-c908267e674e',
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
    chatId: '48e28a6a-9049-4270-8f2e-3ef1523fa2d1',
    users: [
      {
        userId: '67f2b05c-de4a-4f7a-a55d-2b8a10159a1c',
        username: 'user1',
      },
      {
        userId: '2133ceb2-a218-4b67-bf31-8878351d3e27',
        username: 'admin',
      },
    ],
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    chatId: '61fd9ef8-b52c-45be-890f-25809c928795',
    users: [
      {
        userId: '32e73174-6cbc-4627-9be1-3450b5b87fa0',
        username: 'user2',
      },
      {
        userId: '98864a68-b16b-494e-986d-c908267e674e',
        username: 'user3',
      },
    ],
    createdAt: '2019-10-25T09:19:31.847Z',
  },
];

const groupChats = [
  {
    chatId: '33bd9d13-bcb3-4df7-b6a0-4312ea6a0756',
    users: [
      {
        userId: '67f2b05c-de4a-4f7a-a55d-2b8a10159a1c',
        username: 'user1',
      },
      {
        userId: '2133ceb2-a218-4b67-bf31-8878351d3e27',
        username: 'admin',
      },
      {
        userId: '32e73174-6cbc-4627-9be1-3450b5b87fa0',
        username: 'user2',
      },
    ],
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    chatId: '7a389f74-8aba-4e52-9470-efc335483fd0',
    users: [
      {
        userId: '32e73174-6cbc-4627-9be1-3450b5b87fa0',
        username: 'user2',
      },
      {
        userId: '2133ceb2-a218-4b67-bf31-8878351d3e27',
        username: 'admin',
      },
      {
        userId: '67f2b05c-de4a-4f7a-a55d-2b8a10159a1c',
        username: 'user1',
      },
      {
        userId: '98864a68-b16b-494e-986d-c908267e674e',
        username: 'user3',
      },
    ],
    createdAt: '2019-10-25T09:19:31.847Z',
  },
];

const privateMessages = [
  {
    id: '8690789c-ce25-49a7-b530-b0dfcaff1262',
    chatId: '48e28a6a-9049-4270-8f2e-3ef1523fa2d1',
    userId: '2133ceb2-a218-4b67-bf31-8878351d3e27',
    message: 'Hello, participant, Hope you are enjoying the platform',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    messageId: 'b61608ae-49c3-4bc2-a24e-5db6aecb5d33',
    chatId: '61fd9ef8-b52c-45be-890f-25809c928795',
    userId: '32e73174-6cbc-4627-9be1-3450b5b87fa0',
    message: 'Yes,  I am. Thanks for checking up',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    messageId: '61fd9ef8-3567-43c9-af85-88b7174858dc',
    chatId: '61fd9ef8-b52c-45be-890f-25809c928795',
    userId: '2133ceb2-a218-4b67-bf31-8878351d3e27',
    message: 'You are welcome.',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
];

const groupMessages = [
  {
    id: '483e37f2-fa2d-465d-aa2c-81625d4c59e7',
    chatId: '7a389f74-8aba-4e52-9470-efc335483fd0',
    userId: '2133ceb2-a218-4b67-bf31-8878351d3e27',
    message: 'Hello, Good day!',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    messageId: 'a7d4166d-ede9-4279-b5cc-3daf5e03fdd0',
    chatId: '7a389f74-8aba-4e52-9470-efc335483fd0',
    userId: '67f2b05c-de4a-4f7a-a55d-2b8a10159a1c',
    message: 'Hi Admin, How are you doing?',
    createdAt: '2019-10-25T09:19:31.847Z',
  },
  {
    id: '2f568fad-b588-4340-b908-085ed21937c3',
    chatId: '7a389f74-8aba-4e52-9470-efc335483fd0',
    userId: '32e73174-6cbc-4627-9be1-3450b5b87fa0',
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
