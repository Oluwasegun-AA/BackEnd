import uuid from 'uuid/v4';
import { MakeSchema } from '../helpers';
import { Schema } from 'mongoose';

const rules = {
  chatId: {
    type: Schema.Types.ObjectId,
    minlength: 36,
    required: [true, 'chatId not supplied'],
  },
  userId: {
    type: Schema.Types.ObjectId,
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
