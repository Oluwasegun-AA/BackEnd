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
    required: [true, 'message not supplied'],
  },
  createdAt: { type: Date, default: Date.now },
};

const controller = new MakeSchema('PrivateMessages', rules);
const PrivateMessageModel = controller.getModel();
const PrivateMessageSchema = controller.getSchema();

export { PrivateMessageModel, PrivateMessageSchema };
