class ResponseHandler {
  static success(res: any, code: number, message: string, data: any): any {
    return res.status(code).json({
      status: code,
      message,
      data
    });
  }

  static error(res: any, code: number, error: any): any {
    return res.status(code).json({
      status: code,
      error
    });
  }
}

export default ResponseHandler;
