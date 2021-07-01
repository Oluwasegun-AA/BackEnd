import mongoose from 'mongoose';
import { MakeSchema, validatePath } from '../helpers';

const { ObjectId } = mongoose.Types;

const rules = {
  users: [{
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
  }],
  createdAt: { type: Date, default: Date.now },
};

const controller = new MakeSchema('PrivateChats', rules);
const PrivateChatModel = controller.getModel();
const PrivateChatSchema = controller.getSchema();
validatePath(PrivateChatSchema, 'users');

export { PrivateChatModel, PrivateChatSchema };
