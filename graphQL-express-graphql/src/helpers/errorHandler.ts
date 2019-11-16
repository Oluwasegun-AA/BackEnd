import { keys, isNumber } from 'lodash';
import { statusCodes, statusMessages } from '../helpers';


class ResponseHandler {
  static error = (message: string): object => {
    const key: string = message.split(',')[0];
    const index: number = keys(statusCodes).lastIndexOf(key);
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
