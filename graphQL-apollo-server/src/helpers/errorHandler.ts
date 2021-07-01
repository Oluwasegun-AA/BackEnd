class ResponseHandler {
  static error = (message: string): Error => {
    if (message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    };
    return new Error(message);
  }
}
export default ResponseHandler;
