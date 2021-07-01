import { GroupMessageModel, PrivateMessageModel } from '../models';
import {
  ResponseHandler,
  statusMessages,
  statusCodes,
  GetData,
} from '../helpers';

const { success, created } = statusMessages;

const MessageSuccessResponse = (res, string, data) =>
  ResponseHandler.success(
    res,
    statusCodes.success,
    success(string),
    data || res.data
  );
const saveData = async (req, res, Model) => {
  const values = GetData.message(req);
  const model = new Model(values);
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
      created('Message'),
      value
    );
  });
};

class Messages {
  static async getOneMessage(req, res) {
    return MessageSuccessResponse(res, 'Message Retrieved');
  }

  static async getAllMessages(req, res) {
    return MessageSuccessResponse(res, 'Messages Retrieved');
  }

  static async postPrivateMessage(req, res) {
    saveData(req, res, PrivateMessageModel);
  }

  static async postGroupMessage(req, res) {
    saveData(req, res, GroupMessageModel);
  }

  static async updateMessage(req, res) {
    const update = GetData.message(req);
    const model = req.url.includes('/group')
      ? GroupMessageModel
      : PrivateMessageModel;
    await model.findOneAndUpdate({ _id: req.params.id }, update);
    return MessageSuccessResponse(res, 'Message Updated', await model.findById(req.params.id));
  }

  static async deleteMessage(req, res) {
    const model = req.url.includes('/group')
      ? GroupMessageModel
      : PrivateMessageModel;
    const data = await model.findByIdAndDelete(req.params.id);
    return MessageSuccessResponse(res, 'Message deleted', data);
  }

  static async findAllMessagesByUser(req, res) {
    MessageSuccessResponse(res, 'Messages retrieved');
  }
}

export default Messages;
