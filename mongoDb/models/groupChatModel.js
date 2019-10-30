import uuid from 'uuid/v4';
import { MakeSchema, Schema } from '../helpers';

const childRules = {
  userId: {
    type: String,
    minlength: 36,
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

new MakeSchema('groupChatUsers', childRules).getModel();

const rules = {
  id: {
    type: String,
    minlength: 36,
    unique: true,
    default: uuid(),
  },
  chatId: {
    type: String,
    minlength: 36,
    required: [true, 'chatId not supplied'],
  },
  users: [{
    type: Schema.ObjectId,
    ref: 'groupChatUsers',
    required: [true, 'users not supplied'],
  }],
  createdAt: { type: Date, default: Date.now },
};

const controller = new MakeSchema('GroupChats', rules);
const GroupChatModel = controller.getModel();
const GroupChatSchema = controller.getSchema();

export { GroupChatModel, GroupChatSchema };
