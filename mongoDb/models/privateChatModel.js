import uuid from 'uuid/v4';
import { MakeSchema, Schema } from '../helpers';

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
  users: [Schema.Types.Mixed],
  createdAt: { type: Date, default: Date.now },
};

const controller = new MakeSchema('PrivateChats', rules);
const PrivateChatModel = controller.getModel();
const PrivateChatSchema = controller.getSchema();

export { PrivateChatModel, PrivateChatSchema };
