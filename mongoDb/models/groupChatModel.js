import mongoose from 'mongoose';
import { MakeSchema, validatePath } from '../helpers';

const { ObjectId } = mongoose.Types;

const rules = {
  groupName: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, 'group name not supplied'],
  },
  admin: {
    type: ObjectId,
    unique: true,
    required: [true, 'admin id not supplied'],
  },
  users: [
    {
      _id: false,
      userId: {
        type: ObjectId,
        unique: true,
        required: [true, 'userId not supplied'],
      },
      username: {
        type: String,
        maxlength: 30,
        minlength: 3,
        required: [true, 'username not supplied'],
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
};

const controller = new MakeSchema('GroupChats', rules);
const GroupChatModel = controller.getModel();
const GroupChatSchema = controller.getSchema();
validatePath(GroupChatSchema, 'users');

export { GroupChatModel, GroupChatSchema };
