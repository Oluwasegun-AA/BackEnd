import { GroupChatModel, PrivateChatModel } from '../models';
import { ResponseHandler, statusMessages, statusCodes } from '../helpers';

const { success, created } = statusMessages;

const chatSuccessResponse = (res, string, data) =>
  ResponseHandler.success(
    res,
    statusCodes.success,
    success(string),
    res.data || data
  );
const saveData = async (req, res, Model) => {
  const data = req;
  const model = new Model(data);
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
};

class Chats {
  static async getOneChat(req, res) {
    return chatSuccessResponse(res, 'Chat Retrieved');
  }

  static async getAllChats(req, res) {
    return chatSuccessResponse(res, 'Chats Retrieved');
  }

  static async postPrivateChat(req, res) {
    saveData(req, res, PrivateChatModel);
  }

  static async postGroupChat(req, res) {
    saveData(req, res, GroupChatModel);
  }

  static async updateChat(req, res) {
    const data = await db.updateChat(req, res);
    return chatSuccessResponse(res, 'Chat Updated', data);
  }

  static async deleteChat(req, res) {
    const data = await db.deleteChat(req, res);
    return chatSuccessResponse(res, 'Chat deleted', data);
  }

  static async findAllChatsByUser(req, res) {
    const data = await db.findAllChatsByUser(req, res);
    return chatSuccessResponse(res, 'Chat retrieved', data);
  }
}

export default Chats;
