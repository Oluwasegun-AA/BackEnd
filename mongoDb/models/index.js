// import db from '../../db/dbSetup';
import { UserModel, UserSchema, LoginModel } from './userModel';
import { PrivateChatModel, PrivateChatSchema } from './privateChatModel';
import { GroupChatModel, GroupChatSchema } from './groupChatModel';
import {
  PrivateMessageModel,
  PrivateMessageSchema,
} from './privateMessageModel';
import { GroupMessageModel, GroupMessageSchema } from './groupMessageModel';

// const query = async (collection, method, data) => {
//   const resp = await db[collection][method](data);
//   return resp;
// };

export {
  UserModel,
  UserSchema,
  LoginModel,
  PrivateChatModel,
  PrivateChatSchema,
  GroupChatModel,
  GroupChatSchema,
  PrivateMessageModel,
  PrivateMessageSchema,
  GroupMessageModel,
  GroupMessageSchema,
};
