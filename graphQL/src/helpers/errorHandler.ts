import { keys, isNumber } from 'lodash';
import { statusCodes, statusMessages } from '../helpers';

class ResponseHandler {
  static success(code: number, message: string, data: any): any {
    return {
      status: code,
      message,
      data
    };
  }

  static error = (message: string): object => {
    const key: string = message.split(',')[0];
    const index: any = keys(statusCodes).lastIndexOf(key);
    if ((isNumber(index) && index !== -1)) {
      return {
        status: statusCodes[key],
        error: statusMessages[key](message.split(',')[1])
      }
    }
    return {
      status: 'error',
      error: message
    }
  }
}

export default ResponseHandler;
