import uuid from 'uuid/v4';
import { MakeSchema, Schema } from '../helpers';

const childRules = {
  userId: {
    type: String,
    unique: true,
    required: [true, 'userId not supplied'],
  },
  username: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, 'username not supplied'],
  },
};

const childSchema = new MakeSchema('groupChatUsers', childRules).getSchema();

const rules = {
  users: [childSchema],
  createdAt: { type: Date, default: Date.now },
};

const controller = new MakeSchema('GroupChats', rules);
const GroupChatModel = controller.getModel();
const GroupChatSchema = controller.getSchema();

export { GroupChatModel, GroupChatSchema };
