import { omit, isEmpty } from 'lodash';
import {
  GroupChatModel,
  PrivateChatModel,
  PrivateMessageModel,
  GroupMessageModel,
} from '../models';
import {
  ResponseHandler,
  statusMessages,
  statusCodes,
  GetData,
} from '../helpers';

const { success, created } = statusMessages;

const chatSuccessResponse = (res, string, data) =>
  ResponseHandler.success(
    res,
    statusCodes.success,
    success(string),
    data || res.data
  );
const saveData = async (req, res, Model) => {
  const { data } = res;
  if (isEmpty(data)) {
    const { users, groupName } = GetData.chat(req);
    const model = new Model({ users, groupName });
    await model.save((err, value) => {
      if (err) {
        return ResponseHandler.error(
          res,
          statusCodes.serverError,
          statusMessages.serverErrorMessage()
        );
      }
      return ResponseHandler.success(
        res,
        statusCodes.created,
        created('Chat'),
        value
      );
    });
  } else return chatSuccessResponse(res, 'chat found', data);
};

const getData = async (model, query) => {
  const data = await model.find(query);
  if (isEmpty(data)) {
    return undefined;
  }
  return data;
};
class Chats {
  static async getOneChat(req, res) {
    return chatSuccessResponse(res, 'Chat Retrieved');
  }

  static async getAllChats(req, res) {
    return chatSuccessResponse(res, 'Chats Retrieved');
  }

  static async getAllMessagesInChat(req, res) {
    const condition = { chatId: req.params.id };
    const chats =
      (await getData(GroupMessageModel, condition)) ||
      (await getData(PrivateMessageModel, condition));
    if (!isEmpty(chats)) {
      return chatSuccessResponse(res, 'Chats retrieved successfully', chats);
    }
    return ResponseHandler.error(
      res,
      statusCodes.notFound,
      statusMessages.notFound('Chat history')
    );
  }

  static async postPrivateChat(req, res) {
    saveData(req, res, PrivateChatModel);
  }

  static async postGroupChat(req, res) {
    saveData(req, res, GroupChatModel);
  }

  static async updateChat(req, res) {
    const update = GetData.chat(req);
    const userExist = update.users
      ? await GroupChatModel.findOne({
        'users.userId': update.users[0].userId,
      })
      : undefined;
    if (!isEmpty(userExist)) {
      return ResponseHandler.error(
        res,
        statusCodes.conflict,
        statusMessages.conflict('user already in the group')
      );
    }
    await GroupChatModel.updateOne(
      { _id: req.params.id },
      { $push: { users: update.users }, ...omit(update, ['users']) }
    );
    return chatSuccessResponse(
      res,
      'Chat Updated',
      await GroupChatModel.findById(req.params.id)
    );
  }

  static async deleteChat(req, res) {
    const model = req.url.includes('/group')
      ? GroupChatModel
      : PrivateChatModel;
    const data = await model.findByIdAndDelete(req.params.id);
    return chatSuccessResponse(res, 'Chat deleted', data);
  }

  static async findAllChatsByUser(req, res) {
    chatSuccessResponse(res, 'Chats retrieved');
  }
}

export default Chats;
