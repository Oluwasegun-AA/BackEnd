class ResponseHandler {
  static success(res, code, message, data) {
    return res.status(code).json({
      status: code,
      message,
      data
    });
  }

  static error(res, code, error) {
    return res.status(code).json({
      status: code,
      error
    });
  }
}

export default ResponseHandler;
