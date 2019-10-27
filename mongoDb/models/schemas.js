import mongoose from 'mongoose';
import uuid from 'uuid/v4';

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    minlength: 36,
    default: uuid(),
  },
  firstName: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, 'firstName not supplied'],
  },
  lastName: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, 'lastName not supplied'],
  },
  username: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, 'username not supplied'],
  },
  email: {
    type: String,
    maxlength: 30,
    minlength: 10,
    required: [true, 'email not supplied'],
  },
  password: {
    type: String,
    minlength: 58,
    required: [true, 'password not supplied'],
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
  },
  createdAt: { type: Date, default: Date.now },
});
const privateChatSchema = Schema({
  id: {
    type: String,
    minlength: 36,
    default: uuid(),
  },
  chatId: {
    type: String,
    minlength: 36,
    required: [true, 'chatId not supplied'],
  },
  users: [Schema.Types.Mixed],
  createdAt: { type: Date, default: Date.now },
});
const groupChatSchema = Schema({
  id: {
    type: String,
    minlength: 36,
    default: uuid(),
  },
  chatId: {
    type: String,
    minlength: 36,
    required: [true, 'chatId not supplied'],
  },
  users: [Schema.Types.Mixed],
  createdAt: { type: Date, default: Date.now },
});
const privateMessageSchema = Schema({
  id: {
    type: String,
    minlength: 36,
    default: uuid(),
  },
  chatId: {
    type: String,
    minlength: 36,
    required: [true, 'chatId not supplied'],
  },
  userId: {
    type: String,
    minlength: 36,
    required: [true, 'userId not supplied'],
  },
  message: {
    type: String,
    maxlength: 1000,
    required: [true, 'message not supplied'],
  },
  createdAt: { type: Date, default: Date.now },
});
const groupMessageSchema = Schema({
  id: {
    type: String,
    minlength: 36,
    default: uuid(),
  },
  chatId: {
    type: String,
    minlength: 36,
    required: [true, 'chatId not supplied'],
  },
  userId: {
    type: String,
    minlength: 36,
    required: [true, 'userId not supplied'],
  },
  message: {
    type: String,
    maxlength: 1000,
    minlength: 1,
    required: [true, 'message not supplied'],
  },
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model('Users', userSchema, 'Users');
const privateChatModel = mongoose.model('PrivateChats', privateChatSchema, 'PrivateChats');
const groupChatModel = mongoose.model('GroupChats', groupChatSchema, 'GroupChats');
const privateMessageModel = mongoose.model(
  'PrivateMessages',
  privateMessageSchema,
  'PrivateMessages'
);
const groupMessageModel = mongoose.model('GroupMessages', groupMessageSchema, 'GroupMessages');

export {
  userModel,
  privateChatModel,
  groupChatModel,
  privateMessageModel,
  groupMessageModel,
};
