import uuid from 'uuid/v4';
import { MakeSchema } from '../helpers';

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
};

const controller = new MakeSchema('GroupMessages', rules);
const GroupMessageModel = controller.getModel();
const GroupMessageSchema = controller.getSchema();

export { GroupMessageModel, GroupMessageSchema };
