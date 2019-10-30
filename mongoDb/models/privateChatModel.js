import uuid from 'uuid/v4';
import { MakeSchema, Schema } from '../helpers';

const childRules = {
  userId: {
    type: String,
    minlength: 36,
    unique: true,
    required: [true, 'userId not supplied']
  },
  username: {
    type: String,
    maxlength: 30,
    minlength: 3,
    required: [true, 'username not supplied']
  },
};

const childModel = new MakeSchema('privateChatUsers', childRules).getModel();

const rules = {
  users: {
    type: Schema.ObjectId,
    ref: 'privateChatUsers',
    required: [true, 'users not supplied'],
  },
  createdAt: { type: Date, default: Date.now },
};

const controller = new MakeSchema('PrivateChats', rules);
const PrivateChatModel = controller.getModel();
const PrivateChatSchema = controller.getSchema();

export { PrivateChatModel, PrivateChatSchema, childModel };
